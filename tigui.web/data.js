var list_random_number_generator = [
	{value: 'DX-1597-2-7', enablelist: []                 , disablelist: ['random_luxlevel']},
	{value: 'KISS99'     , enablelist: []                 , disablelist: ['random_luxlevel']},
	{value: 'MRG32k3a'   , enablelist: []                 , disablelist: ['random_luxlevel']},
	{value: 'RANLUX'     , enablelist: ['random_luxlevel'], disablelist: []                 }
];
var list_random_luxlevel = [
	{value: '0'},
	{value: '1'},
	{value: '2'},
	{value: '3'},
	{value: '4'}
];
var list_ensemble = [
	{value: 'npt', enablelist: ['pressure']                        , disablelist: ['chempot', 'tmmc_flag', 'louthist_t', 'louthist_f']            },
	{value: 'nvt', enablelist: []                                  , disablelist: ['pressure', 'chempot', 'tmmc_flag', 'louthist_t', 'louthist_f']},
	{value: 'uvt', enablelist: ['chempot', 'tmmc_flag', 'louthist'], disablelist: ['pressure']                                    }
];
var list_stepstyle = [
	{value: 'cycles'},
	{value: 'moves'}
];
var list_controlstyle = [
	{value: 'equilibration', enablelist: [], disablelist:['printfreq', 'blocksize', 'moviefreq', 'backupfreq', 'restartfreq', 'runoutput', 'pdb_output_freq', 'pressurefreq', 'trmaxdispfreq', 'volmaxdispfreq']},
	{value: 'production'   , enablelist: [], disablelist:['printfreq', 'blocksize', 'moviefreq', 'backupfreq', 'restartfreq', 'runoutput', 'pdb_output_freq', 'pressurefreq', 'trmaxdispfreq', 'volmaxdispfreq']},
	{value: 'manual'       , enablelist: ['printfreq', 'blocksize', 'moviefreq', 'backupfreq', 'restartfreq', 'runoutput', 'pdb_output_freq', 'pressurefreq', 'trmaxdispfreq', 'volmaxdispfreq'], disablelist:[]}
];
var list_runoutput = [
	{value: 'full'},
	{value: 'blocks'},
	{value: 'updates'},
	{value: 'none'}
];
var list_solvation_style = [
	{value: 'none', enablelist: [], disablelist: ['solvation_type']},
	{value: 'internal', enablelist: ['solvation_type'], disablelist: []},
	{value: 'external', enablelist: ['solvation_type'], disablelist: []}
];
var list_initboxtype = [
	{value: 'unit cell', enablelist: [], disablelist: ['initstyle', 'initlattice', 'initmol', 'hmatrix', 'box_number_density']},
	{value: 'dimensions', enablelist: ['initstyle', 'initlattice', 'initmol', 'hmatrix'], disablelist: ['box_number_density']},
	{value: 'number density', enablelist: ['initstyle', 'initlattice', 'initmol', 'box_number_density'], disablelist: ['hmatrix']}
];
var list_initstyle = [
	{value: 'full cbmc', enablelist: [], disablelist: []},
	{value: 'template', enablelist: [], disablelist: []},
	{value: 'coords', enablelist: [], disablelist: []},
	{value: 'nanotube', enablelist: [], disablelist: []},
	{value: 'helix cbmc', enablelist: [], disablelist: []},
	{value: 'partial cbmc', enablelist: [], disablelist: []}
];
var list_helix_keytype = [
	{value: 'element'},
	{value: 'nbname'},
	{value: 'pdbname'}
];
var list_initlattice = [
	{value: 'center'},
	{value: 'none'},
	{value: 'simple cubic'}
];
var list_potentialstyle = [
	{value: 'internal', enablelist: ['classical_potential', 'electrostatic_form', 'max_bond_length'], disablelist: []},
	{value: 'external', enablelist: [], disablelist: ['classical_potential', 'electrostatic_form', 'max_bond_length']}
];
var list_classical_potential = [
	{value: '12-6 plus 12-10 H-bond', enablelist: [], disablelist: []},
	{value: '12-6 plus solvation', enablelist: [], disablelist: []},
	{value: '12-9-6', enablelist: [], disablelist: []},
	{value: '9-6', enablelist: [], disablelist: []},
	{value: 'Buffered 14-7', enablelist: [], disablelist: []},
	{value: 'Double Exponential', enablelist: [], disablelist: []},
	{value: 'Embedded Atom Method', enablelist: [], disablelist: []},
	{value: 'EAM pair only', enablelist: [], disablelist: []},
	{value: 'Exponential-12-6', enablelist: [], disablelist: []},
	{value: 'Exponential-6', enablelist: [], disablelist: []},
	{value: 'Gordon n-6', enablelist: [], disablelist: []},
	{value: 'Hard 2580 Multistep', enablelist: [], disablelist: []},
	{value: 'Hard Sphere', enablelist: [], disablelist: []},
	{value: 'Lennard-Jones', enablelist: [], disablelist: []},
	{value: 'Multiwell', enablelist: [], disablelist: []},
	{value: 'Repulsive 2580 Multistep', enablelist: [], disablelist: []},
	{value: 'Repulsive Multiwell', enablelist: [], disablelist: []},
	{value: 'Repulsive Sphere', enablelist: [], disablelist: []},
	{value: 'Repulsive Well', enablelist: [], disablelist: []},
	{value: 'Scaled Lennard-Jones', enablelist: [], disablelist: []},
	{value: 'Stillinger-Weber', enablelist: [], disablelist: []},
	{value: 'SW pair only', enablelist: [], disablelist: []},
	{value: 'Square Well', enablelist: [], disablelist: []},
	{value: 'Tabulated Pair', enablelist: [], disablelist: []},
	{value: 'UFF 12-6', enablelist: [], disablelist: []},
	{value: 'Weeks-Chandler-Anderson', enablelist: [], disablelist: []}
];
var list_electrostatic_form = [
	{value: 'none', enablelist: [], disablelist: ['coulombstyle']},
	{value: 'coulomb', enablelist: ['coulombstyle'], disablelist: []}
];
var list_coulombstyle = [
	{value: 'ewald_fixed_kmax', enablelist: ['kalp', 'kmax', 'dielect'], disablelist: ['ewald_prec', 'rcelect']},
	{value: 'ewald_fixed_cutoff', enablelist: ['ewald_prec', 'rcelect', 'dielect'], disablelist: ['kalp', 'kmax']},
	{value: 'minimum image', enablelist: ['dielect'], disablelist: ['kalp', 'kmax', 'ewald_prec', 'rcelect']}
];
var list_cbmc_formulation = [
	{value: 'Martin and Frischknecht 2006', enablelist: [], disablelist: []},
	{value: 'Martin and Siepmann 1999 + Martin and Thompson 2004', enablelist: [], disablelist: []}
];
var list_cbmc_setting_style = [
	{value: 'Martin and Frischknecht', enablelist: [], disablelist: []},
	{value: 'default ideal', enablelist: [], disablelist: []},
	{value: 'widom ideal', enablelist: [], disablelist: []},
	{value: 'Martin and Thompson FPE 2004', enablelist: [], disablelist: []},
	{value: 'default autofit gaussian', enablelist: [], disablelist: []},
	{value: 'explicit', enablelist: [], disablelist: []}
];
var list_forcefield = [
	{value: 'Ackl2004'  },
	{value: 'Alavi2005' },
	{value: 'Amber96'   },
	{value: 'Aqvist'    },
	{value: 'Belash2006'},
	{value: 'Belash2013'},
	{value: 'C19eef1'   },
	{value: 'C19sasa'   },
	{value: 'C27rigid'  },
	{value: 'CatlowFaux'},
	{value: 'Charmm19'  },
	{value: 'Charmm22'  },
	{value: 'Charmm22fe'},
	{value: 'Charmm27'  },
	{value: 'Charmm27x' },
	{value: 'ClayFF'    },
	{value: 'COMPASSv1' },
	{value: 'Coon1987'  },
	{value: 'Cui1998'   },
	{value: 'Cui2002'   },
	{value: 'DACNIS-UA' },
	{value: 'devel'     },
	{value: 'Dick1994'  },
	{value: 'Ding1986'  },
	{value: 'DREIDING'  },
	{value: 'Dubb2004'  },
	{value: 'DWS2001'   },
	{value: 'Elli2002'  },
	{value: 'EPM'       },
	{value: 'Fris2003'  },
	{value: 'Fris2008'  },
	{value: 'Gala1994'  },
	{value: 'Gordon'    },
	{value: 'Gromos43A1'},
	{value: 'HardSphere'},
	{value: 'Hoyt2003'  },
	{value: 'Jaramillo' },
	{value: 'KFvBvS'    },
	{value: 'Last1993'  },
	{value: 'LGM'       },
	{value: 'LJium'     },
	{value: 'MCY1976'   },
	{value: 'Mend2003'  },
	{value: 'mgmstereo' },
	{value: 'MM2'       },
	{value: 'MMFF94'    },
	{value: 'Morrow2002'},
	{value: 'NERDv1'    },
	{value: 'NERDv2'    },
	{value: 'NERDv3'    },
	{value: 'OPLS-1996' },
	{value: 'OPLS-2001' },
	{value: 'OPLS-aa'   },
	{value: 'OPLS-ua'   },
	{value: 'Pana1989'  },
	{value: 'ParkHijazi'},
	{value: 'Potter1997'},
	{value: 'QMFF-VIII' },
	{value: 'Richar1995'},
	{value: 'Shah2004'  },
	{value: 'Shukla1987'},
	{value: 'SKS'       },
	{value: 'Smith1994' },
	{value: 'SMMKmain'  },
	{value: 'SMMKnaip'  },
	{value: 'SPC-E'     },
	{value: 'SquareWell'},
	{value: 'Stil1985'  },
	{value: 'Sum2003'   },
	{value: 'Tele1987'  },
	{value: 'TIP3P'     },
	{value: 'TIP4P'     },
	{value: 'TIP5P'     },
	{value: 'TraPPE-EH' },
	{value: 'TraPPE-UA' },
	{value: 'TraPPE-UAf'},
	{value: 'UFF'       },
	{value: 'Unlu2004'  },
	{value: 'Vega1992'  },
	{value: 'Vink2001'  },
	{value: 'Walt2001'  },
	{value: 'Weiner1984'},
	{value: 'Weiner1986'},
	{value: 'Wielop1985'}
];
