// skill set creation FE
// Every skill is defined as the following data structure:
// * skill_id : int
// * skill_name : string
// * description : string
// * icon : string
// * skill_rarity : int, range from 0 to 4, denoted as 0=common, 1=uncommon, 2=rare, 3=epic, 4=legendary
// * skill_can_be_acquired_by : Array of ints, every int corresponds to certain enum.
// * impacts : Dictionary with the format {impact_category : {impact_operator : impact_factor}}

// Note:
// skill_can_be_acquired_by can contain any of the following enums:
// * -1=universal
// * 1=deer
// * 2=duck
// * 3=bear
// * 4=cat
// * 5=crocodile
// * 6=puppy
// * 7=elephant
// * 8=frog
// * 9=owl
// * 10=pig
// * 11=squirrel
// * 101=designer
// * 102=programmer
// * 103=tester
// * 104=data_analyst
// * 1001=E
// * 1002=I
// * 1003=N
// * 1004=S
// * 1005=T
// * 1006=F
// * 1007=J
// * 1008=P
// * 1009=INTJ
// * 1010=INTP
// * 1011=ENTJ
// * 1012=ENTP
// * 1013=INFJ
// * 1014=INFP
// * 1015=ENFJ
// * 1016=ENFP
// * 1017=ISTJ
// * 1018=ISFJ
// * 1019=ESTJ
// * 1020=ESFJ
// * 1021=ISTP
// * 1022=ISFP
// * 1023=ESTP
// * 1024=ESFP

// impact_category definitions:
// * 1=company
// * 2=project_team
// * 3=individual
// * 10001=art
// * 10002=code
// * 10003-test
// * 10004=doc
// * 10005=management
// * 10006=happiness
// * 10007=stress
// * 10008=success_rate
// * 10009=event_rate

// impact_operator definition:
// * 1=add
// * 2=multiply

// impact_factor can be any float numbers.

'use client';

import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Toolbar,
  Typography,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface Skill {
  skill_id: number;
  skill_name: string;
  description: string;
  icon: string;
  skill_rarity: number;
  skill_can_be_acquired_by: number[];
  impacts: {
    [key: number]: {
      [key: number]: number;
    };
  };
}

interface Impact {
  category: string;
  operator: string;
  factor: number;
}

const RARITY_LEVELS = [
  { value: 0, label: 'Common' },
  { value: 1, label: 'Uncommon' },
  { value: 2, label: 'Rare' },
  { value: 3, label: 'Epic' },
  { value: 4, label: 'Legendary' },
];

const ACQUIRABLE_BY = {
  '-1': 'Universal',
  '1': 'Deer', '2': 'Duck', '3': 'Bear',
  '4': 'Cat', '5': 'Crocodile', '6': 'Puppy',
  '7': 'Elephant', '8': 'Frog', '9': 'Owl',
  '10': 'Pig', '11': 'Squirrel',
  '101': 'Designer', '102': 'Programmer',
  '103': 'Tester', '104': 'Data Analyst',
  '1001': 'E', '1002': 'I', '1003': 'N', '1004': 'S',
  '1005': 'T', '1006': 'F', '1007': 'J', '1008': 'P',
  '1009': 'INTJ', '1010': 'INTP', '1011': 'ENTJ', '1012': 'ENTP',
  '1013': 'INFJ', '1014': 'INFP', '1015': 'ENFJ', '1016': 'ENFP',
  '1017': 'ISTJ', '1018': 'ISFJ', '1019': 'ESTJ', '1020': 'ESFJ',
  '1021': 'ISTP', '1022': 'ISFP', '1023': 'ESTP', '1024': 'ESFP'
};

const IMPACT_CATEGORIES = {
  '1': 'Company',
  '2': 'Project Team',
  '3': 'Individual',
  '10001': 'Art',
  '10002': 'Code',
  '10003': 'Test',
  '10004': 'Doc',
  '10005': 'Management',
  '10006': 'Happiness',
  '10007': 'Stress',
  '10008': 'Success Rate',
  '10009': 'Event Rate'
};

const IMPACT_OPERATORS = {
  '1': 'Add',
  '2': 'Multiply'
};

export default function SkillSetCreationTool() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    skill_rarity: 0,
    skill_can_be_acquired_by: [],
    impacts: {},
  });
  const [impacts, setImpacts] = useState<Impact[]>([]);
  const [filters, setFilters] = useState({
    rarity: '',
    acquirableBy: '',
  });
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleAddSkill = () => {
    setIsEditing(false);
    setNewSkill({
      skill_rarity: 0,
      skill_can_be_acquired_by: [],
      impacts: {},
    });
    setImpacts([]);
    setIsDialogOpen(true);
  };

  const handleEditSkill = (skill: Skill) => {
    setIsEditing(true);
    setNewSkill(skill);
    // Convert impacts dictionary back to array format for editing
    const impactsArray: Impact[] = [];
    Object.entries(skill.impacts).forEach(([category, operators]) => {
      Object.entries(operators).forEach(([operator, factor]) => {
        impactsArray.push({
          category,
          operator,
          factor,
        });
      });
    });
    setImpacts(impactsArray);
    setIsDialogOpen(true);
  };

  const handleAddImpact = () => {
    setImpacts([...impacts, { category: '', operator: '', factor: 0 }]);
  };

  const handleRemoveImpact = (index: number) => {
    setImpacts(impacts.filter((_, i) => i !== index));
  };

  const handleImpactChange = (index: number, field: keyof Impact, value: string | number) => {
    const newImpacts = [...impacts];
    newImpacts[index] = { ...newImpacts[index], [field]: value };
    setImpacts(newImpacts);
  };

  const handleSaveSkill = () => {
    if (newSkill.skill_name) {
      // Convert impacts array to the required dictionary format with number keys
      const impactsDict: { [key: number]: { [key: number]: number } } = {};
      impacts.forEach(impact => {
        if (impact.category && impact.operator) {
          const categoryKey = Number(impact.category);
          const operatorKey = Number(impact.operator);
          
          if (!impactsDict[categoryKey]) {
            impactsDict[categoryKey] = {};
          }
          impactsDict[categoryKey][operatorKey] = impact.factor;
        }
      });

      if (isEditing) {
        setSkills(skills.map(skill => 
          skill.skill_id === newSkill.skill_id 
            ? { ...newSkill, impacts: impactsDict } as Skill
            : skill
        ));
      } else {
        setSkills([...skills, {
          ...newSkill,
          skill_id: skills.length,
          impacts: impactsDict
        } as Skill]);
      }
      
      setIsDialogOpen(false);
      setNewSkill({
        skill_rarity: 0,
        skill_can_be_acquired_by: [],
        impacts: {},
      });
      setImpacts([]);
    }
  };

  const handleExport = () => {
    const jsonString = JSON.stringify(skills, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'skills.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSkills = JSON.parse(e.target?.result as string);
          // Convert impact keys back to numbers
          const processedSkills = importedSkills.map((skill: Skill) => ({
            ...skill,
            impacts: Object.entries(skill.impacts).reduce((acc, [category, operators]) => {
              acc[Number(category)] = Object.entries(operators).reduce((opAcc, [op, factor]) => {
                opAcc[Number(op)] = factor;
                return opAcc;
              }, {} as { [key: number]: number });
              return acc;
            }, {} as { [key: number]: { [key: number]: number } })
          }));
          setSkills(processedSkills);
        } catch (error) {
          const errorMessage = (error as Error).message;
          alert(`Error importing skills: ${errorMessage}`);
        }
      };
      reader.readAsText(file);
    }
  };

  const formatImpacts = (impacts: { [key: string]: { [key: string]: number } }) => {
    return Object.entries(impacts).map(([category, operators]) => {
      const categoryName = IMPACT_CATEGORIES[category as keyof typeof IMPACT_CATEGORIES];
      const operatorEffects = Object.entries(operators).map(([op, factor]) => {
        const operatorName = IMPACT_OPERATORS[op as keyof typeof IMPACT_OPERATORS];
        return `${operatorName} ${factor}`;
      }).join(', ');
      return `${categoryName}: ${operatorEffects}`;
    }).join('; ');
  };

  const filteredSkills = [...skills]
    .sort((a, b) => a.skill_id - b.skill_id)
    .filter(skill => {
      if (filters.rarity && skill.skill_rarity !== Number(filters.rarity)) return false;
      if (filters.acquirableBy && !skill.skill_can_be_acquired_by.includes(Number(filters.acquirableBy))) return false;
      return true;
    });

  const HelpDialog = () => (
    <Dialog 
      open={isHelpOpen} 
      onClose={() => setIsHelpOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Enum Mappings Reference</DialogTitle>
      <DialogContent>
        <div className="space-y-6 py-4">
          <div>
            <Typography variant="h6" gutterBottom>Rarity Levels</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Value</TableCell>
                    <TableCell>Label</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {RARITY_LEVELS.map((level) => (
                    <TableRow key={level.value}>
                      <TableCell>{level.value}</TableCell>
                      <TableCell>{level.label}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div>
            <Typography variant="h6" gutterBottom>Acquirable By</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Value</TableCell>
                    <TableCell>Label</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(ACQUIRABLE_BY).map(([value, label]) => (
                    <TableRow key={value}>
                      <TableCell>{value}</TableCell>
                      <TableCell>{label}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div>
            <Typography variant="h6" gutterBottom>Impact Categories</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Value</TableCell>
                    <TableCell>Label</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(IMPACT_CATEGORIES).map(([value, label]) => (
                    <TableRow key={value}>
                      <TableCell>{value}</TableCell>
                      <TableCell>{label}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div>
            <Typography variant="h6" gutterBottom>Impact Operators</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Value</TableCell>
                    <TableCell>Label</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(IMPACT_OPERATORS).map(([value, label]) => (
                    <TableRow key={value}>
                      <TableCell>{value}</TableCell>
                      <TableCell>{label}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsHelpOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Skill Set Creation Tool</h1>
      
      <div className="flex gap-2 mb-4">
        <Button variant="contained" onClick={handleAddSkill}>
          Add New Skill
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleExport}
          disabled={skills.length === 0}
        >
          Export Skills
        </Button>
        <Button
          variant="outlined"
          component="label"
        >
          Import Skills
          <input
            type="file"
            hidden
            accept=".json"
            onChange={handleImport}
          />
        </Button>
      </div>

      <Toolbar className="gap-2 pl-0 pr-0">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Skills List
        </Typography>
        
        <Button 
          variant="outlined" 
          onClick={() => setIsHelpOpen(true)}
          sx={{ mr: 2 }}
        >
          Help
        </Button>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Rarity</InputLabel>
          <Select
            value={filters.rarity}
            onChange={(e) => setFilters({ ...filters, rarity: e.target.value })}
            label="Rarity"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {RARITY_LEVELS.map((level) => (
              <MenuItem key={level.value} value={level.value}>
                {level.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Acquirable By</InputLabel>
          <Select
            value={filters.acquirableBy}
            onChange={(e) => setFilters({ ...filters, acquirableBy: e.target.value })}
            label="Acquirable By"
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {Object.entries(ACQUIRABLE_BY).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Skill' : 'Create New Skill'}</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Skill Name"
              value={newSkill.skill_name || ''}
              onChange={(e) => setNewSkill({ ...newSkill, skill_name: e.target.value })}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Skill Description"
              value={newSkill.description || ''}
              onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
            />

            <TextField
              fullWidth
              label="Icon"
              value={newSkill.icon || ''}
              onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
            />

            <FormControl fullWidth>
              <InputLabel>Rarity</InputLabel>
              <Select
                value={newSkill.skill_rarity}
                onChange={(e) => setNewSkill({ ...newSkill, skill_rarity: e.target.value as number })}
              >
                {RARITY_LEVELS.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Acquired By</InputLabel>
              <Select
                multiple
                value={newSkill.skill_can_be_acquired_by}
                onChange={(e) => {
                  const value = e.target.value as number[];
                  setNewSkill({ ...newSkill, skill_can_be_acquired_by: value });
                }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={ACQUIRABLE_BY[value.toString() as keyof typeof ACQUIRABLE_BY]} />
                    ))}
                  </Box>
                )}
              >
                {Object.entries(ACQUIRABLE_BY).map(([value, label]) => (
                  <MenuItem key={value} value={Number(value)}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3>Impacts</h3>
                <IconButton onClick={handleAddImpact}>
                  <AddIcon />
                </IconButton>
              </div>
              
              {impacts.map((impact, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={impact.category}
                      onChange={(e) => handleImpactChange(index, 'category', e.target.value)}
                    >
                      {Object.entries(IMPACT_CATEGORIES).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Operator</InputLabel>
                    <Select
                      value={impact.operator}
                      onChange={(e) => handleImpactChange(index, 'operator', e.target.value)}
                    >
                      {Object.entries(IMPACT_OPERATORS).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    type="number"
                    label="Factor"
                    value={impact.factor}
                    onChange={(e) => handleImpactChange(index, 'factor', parseFloat(e.target.value))}
                  />

                  <IconButton onClick={() => handleRemoveImpact(index)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>

            <Button variant="contained" onClick={handleSaveSkill}>
              Save Skill
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <HelpDialog />

      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Rarity</TableCell>
              <TableCell>Acquirable By</TableCell>
              <TableCell>Impacts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSkills.map((skill) => (
              <TableRow 
                key={skill.skill_id}
                onClick={() => handleEditSkill(skill)}
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                }}
              >
                <TableCell>{skill.skill_id}</TableCell>
                <TableCell>{skill.skill_name}</TableCell>
                <TableCell>{skill.description}</TableCell>
                <TableCell>{RARITY_LEVELS[skill.skill_rarity].label}</TableCell>
                <TableCell>
                  {skill.skill_can_be_acquired_by
                    .map(id => ACQUIRABLE_BY[id.toString() as keyof typeof ACQUIRABLE_BY])
                    .join(', ')}
                </TableCell>
                <TableCell>{formatImpacts(skill.impacts)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}