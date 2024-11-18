# # 正常运行（只显示必要信息）
# python scripts/update_blog_data.py

# # 调试模式（显示所有信息）
# python scripts/update_blog_data.py --debug

import os
import re
from datetime import datetime
import json
import argparse

def snake_case(s):
    # Convert spaces and special characters to hyphens
    s = re.sub(r'[^a-zA-Z0-9\s-]', '', s)
    s = re.sub(r'\s+', '-', s.strip()).lower()
    return s

def extract_blog_info(file_path, debug=False):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Extract title
        title_match = re.search(r'title="([^"]+)"', content)
        title = title_match.group(1) if title_match else None
        
        # Extract date with more specific pattern
        date_match = re.search(r'date="(\d{4}-\d{2}-\d{2})"', content)
        date = date_match.group(1) if date_match else None
        
        # Debug info
        if debug and not date and 'date=' in content:
            print(f"Warning: Date format issue in {file_path}")
            print("Date pattern found but not matched correctly")
            date_line = re.search(r'date="[^"]*"', content)
            if date_line:
                print(f"Found date line: {date_line.group(0)}")
        
        # Extract tags
        tags = []
        tags_match = re.search(r'tags=\{(\[[^\]]+\])\}', content)
        if tags_match:
            tags_str = tags_match.group(1)
            try:
                # Try to evaluate as a literal array
                tags = eval(tags_str)
            except:
                # If that fails, try to extract from template string
                tag_matches = re.findall(r'"([^"]+)"', tags_str)
                if tag_matches:
                    tags = tag_matches
        
        if title and date:
            try:
                # Validate date format
                datetime.strptime(date, '%Y-%m-%d')
                return {
                    'id': snake_case(title),
                    'title': title,
                    'lastUpdate': date,
                    'path': f'/blog/{snake_case(title)}',
                    'tags': tags
                }
            except ValueError as e:
                if debug:
                    print(f"Warning: Invalid date format in {file_path}: {date}")
                return None
        return None

def update_blog_data(debug=False):
    # Get the project root directory
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Define paths relative to project root
    blog_dir = os.path.join(project_root, 'src', 'app', 'blog')
    page_tsx_path = os.path.join(project_root, 'src', 'app', 'page.tsx')
    
    if debug:
        print(f"Scanning directory: {blog_dir}")
    blogs = []
    
    # Walk through the blog directory
    for root, dirs, files in os.walk(blog_dir):
        for file in files:
            if file == 'page.tsx':
                file_path = os.path.join(root, file)
                if debug:
                    print(f"\nProcessing: {file_path}")
                try:
                    blog_info = extract_blog_info(file_path, debug)
                    if blog_info:
                        if debug:
                            print(f"Successfully extracted info: {blog_info['title']} ({blog_info['lastUpdate']})")
                        blogs.append(blog_info)
                    elif debug:
                        print(f"Could not extract required info from {file_path}")
                except Exception as e:
                    if debug:
                        print(f"Error processing {file_path}: {str(e)}")
    
    if not blogs:
        print("No valid blog posts found!")
        return
    
    # Sort blogs by date (newest first) and take top 5
    try:
        blogs.sort(key=lambda x: datetime.strptime(x['lastUpdate'], '%Y-%m-%d'), reverse=True)
        latest_blogs = blogs[:5]
        
        # Read the current page.tsx
        with open(page_tsx_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Create the new blogData string
        blog_data_str = 'const blogData = ' + json.dumps(latest_blogs, indent=2) + ';'
        
        # Replace the existing blogData
        new_content = re.sub(
            r'const blogData = \[[\s\S]*?\];',
            blog_data_str,
            content
        )
        
        # Write back to page.tsx
        with open(page_tsx_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print("Blog data has been updated successfully!")
        if debug:
            print(f"Found {len(blogs)} blogs, updated with latest {len(latest_blogs)}")
        
    except FileNotFoundError as e:
        if debug:
            print(f"Error: Could not find file: {e.filename}")
            print(f"Working directory: {os.getcwd()}")
            print(f"Project root: {project_root}")
    except Exception as e:
        if debug:
            print(f"Error updating blog data: {str(e)}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Update blog data in page.tsx')
    parser.add_argument('--debug', action='store_true', help='Enable debug output')
    args = parser.parse_args()
    
    update_blog_data(debug=args.debug) 