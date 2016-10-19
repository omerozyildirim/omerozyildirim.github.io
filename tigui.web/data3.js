var list = {
random_number_generator: [
	{value: 'DX-1597-2-7', enablelist: [], disablelist: ['random_luxlevel']},
	{value: 'KISS99', enablelist: [], disablelist: ['random_luxlevel']},
	{value: 'MRG32k3a', enablelist: [], disablelist: ['random_luxlevel']},
	{value: 'RANLUX', enablelist: ['random_luxlevel'], disablelist: []}
],
random_luxlevel: [
	{value: '0', enablelist: [], disablelist: []},
	{value: '1', enablelist: [], disablelist: []},
	{value: '2', enablelist: [], disablelist: []},
	{value: '3', enablelist: [], disablelist: []},
	{value: '4', enablelist: [], disablelist: []}
],
ensemble: [
	{value: 'npt', enablelist: ['pressure'], disablelist: ['tmmc_flag_t', 'tmmc_flag_f', 'louthist_t', 'chempot', 'louthist_f']},
	{value: 'nvt', enablelist: [], disablelist: ['pressure', 'chempot', 'tmmc_flag_t', 'tmmc_flag_f', 'louthist_t', 'louthist_f']},
	{value: 'uvt', enablelist: ['tmmc_flag_t', 'tmmc_flag_f', 'louthist_t', 'chempot', 'louthist_f'], disablelist: ['pressure']}
],
stepstyle: [
	{value: 'cycles', enablelist: [], disablelist: []},
	{value: 'moves', enablelist: [], disablelist: []}
],
controlstyle: [
	{value: 'equilibration', enablelist: [], disablelist:['printfreq', 'blocksize', 'moviefreq', 'backupfreq', 'restartfreq', 'runoutput', 'pdb_output_freq', 'pressurefreq', 'trmaxdispfreq', 'volmaxdispfreq']},
	{value: 'production', enablelist: [], disablelist:['printfreq', 'blocksize', 'moviefreq', 'backupfreq', 'restartfreq', 'runoutput', 'pdb_output_freq', 'pressurefreq', 'trmaxdispfreq', 'volmaxdispfreq']},
	{value: 'manual', enablelist: ['printfreq', 'blocksize', 'moviefreq', 'backupfreq', 'restartfreq', 'runoutput', 'pdb_output_freq', 'pressurefreq', 'trmaxdispfreq', 'volmaxdispfreq'], disablelist:[]}
],
runoutput: [
	{value: 'full', enablelist: [], disablelist: []},
	{value: 'blocks', enablelist: [], disablelist: []},
	{value: 'updates', enablelist: [], disablelist: []},
	{value: 'none', enablelist: [], disablelist: []}
],
solvation_style: [
	{value: 'none', enablelist: [], disablelist: ['solvation_type']},
	{value: 'internal', enablelist: ['solvation_type'], disablelist: []},
	{value: 'external', enablelist: ['solvation_type'], disablelist: []}
],
initboxtype: [
	{value: 'unit cell', enablelist: [], disablelist: ['initstyle', 'initlattice', 'initmol', 'hmatrix0', 'box_number_density']},
	{value: 'dimensions', enablelist: ['initstyle', 'initlattice', 'initmol', 'hmatrix0'], disablelist: ['box_number_density']},
	{value: 'number density', enablelist: ['initstyle', 'initlattice', 'initmol', 'box_number_density'], disablelist: ['hmatrix0']}
],
initstyle: [
	{value: 'full cbmc', enablelist: [], disablelist: ['helix_keytype']},
	{value: 'template', enablelist: [], disablelist: ['helix_keytype']},
	{value: 'coords', enablelist: [], disablelist: ['helix_keytype']},
	{value: 'nanotube', enablelist: [], disablelist: ['helix_keytype']},
	{value: 'helix cbmc', enablelist: ['helix_keytype'], disablelist: []},
	{value: 'partial cbmc', enablelist: [], disablelist: ['helix_keytype']}
],
helix_keytype: [
	{value: 'element', enablelist: [], disablelist: []},
	{value: 'nbname', enablelist: [], disablelist: []},
	{value: 'pdbname', enablelist: [], disablelist: []}
],
initlattice: [
	{value: 'center', enablelist: [], disablelist: []},
	{value: 'none', enablelist: [], disablelist: []},
	{value: 'simple cubic', enablelist: [], disablelist: []}
],
potentialstyle: [
	{value: 'internal', enablelist: ['classical_potential', 'electrostatic_form', 'max_bond_length'], disablelist: []},
	{value: 'external', enablelist: [], disablelist: ['classical_potential', 'electrostatic_form', 'max_bond_length']}
],
classical_potential: [
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
],
electrostatic_form: [
	{value: 'none', enablelist: [], disablelist: ['coulombstyle', 'kalp', 'kmax', 'dielect', 'ewald_prec', 'rcelect', 'dielect']},
	{value: 'coulomb', enablelist: ['coulombstyle'], disablelist: []}
],
coulombstyle: [
	{value: 'ewald_fixed_kmax', enablelist: ['kalp', 'kmax', 'dielect'], disablelist: ['ewald_prec', 'rcelect']},
	{value: 'ewald_fixed_cutoff', enablelist: ['ewald_prec', 'rcelect', 'dielect'], disablelist: ['kalp', 'kmax']},
	{value: 'minimum image', enablelist: ['dielect'], disablelist: ['kalp', 'kmax', 'ewald_prec', 'rcelect']}
],
cbmc_formulation: [
	{value: 'Martin and Frischknecht 2006', enablelist: [], disablelist: []},
	{value: 'Martin and Siepmann 1999 + Martin and Thompson 2004', enablelist: [], disablelist: []}
],
cbmc_setting_style: [
	{value: 'Martin and Frischknecht', enablelist: [], disablelist: []},
	{value: 'default ideal', enablelist: [], disablelist: []},
	{value: 'widom ideal', enablelist: [], disablelist: []},
	{value: 'Martin and Thompson FPE 2004', enablelist: [], disablelist: []},
	{value: 'default autofit gaussian', enablelist: [], disablelist: []},
	{value: 'explicit', enablelist: [], disablelist: []}
],
forcefield: [
	{value: 'Ackl2004'  , enablelist: [], disablelist: []},
	{value: 'Alavi2005' , enablelist: [], disablelist: []},
	{value: 'Amber96'   , enablelist: [], disablelist: []},
	{value: 'Aqvist'    , enablelist: [], disablelist: []},
	{value: 'Belash2006', enablelist: [], disablelist: []},
	{value: 'Belash2013', enablelist: [], disablelist: []},
	{value: 'C19eef1'   , enablelist: [], disablelist: []},
	{value: 'C19sasa'   , enablelist: [], disablelist: []},
	{value: 'C27rigid'  , enablelist: [], disablelist: []},
	{value: 'CatlowFaux', enablelist: [], disablelist: []},
	{value: 'Charmm19'  , enablelist: [], disablelist: []},
	{value: 'Charmm22'  , enablelist: [], disablelist: []},
	{value: 'Charmm22fe', enablelist: [], disablelist: []},
	{value: 'Charmm27'  , enablelist: [], disablelist: []},
	{value: 'Charmm27x' , enablelist: [], disablelist: []},
	{value: 'ClayFF'    , enablelist: [], disablelist: []},
	{value: 'COMPASSv1' , enablelist: [], disablelist: []},
	{value: 'Coon1987'  , enablelist: [], disablelist: []},
	{value: 'Cui1998'   , enablelist: [], disablelist: []},
	{value: 'Cui2002'   , enablelist: [], disablelist: []},
	{value: 'DACNIS-UA' , enablelist: [], disablelist: []},
	{value: 'devel'     , enablelist: [], disablelist: []},
	{value: 'Dick1994'  , enablelist: [], disablelist: []},
	{value: 'Ding1986'  , enablelist: [], disablelist: []},
	{value: 'DREIDING'  , enablelist: [], disablelist: []},
	{value: 'Dubb2004'  , enablelist: [], disablelist: []},
	{value: 'DWS2001'   , enablelist: [], disablelist: []},
	{value: 'Elli2002'  , enablelist: [], disablelist: []},
	{value: 'EPM'       , enablelist: [], disablelist: []},
	{value: 'Fris2003'  , enablelist: [], disablelist: []},
	{value: 'Fris2008'  , enablelist: [], disablelist: []},
	{value: 'Gala1994'  , enablelist: [], disablelist: []},
	{value: 'Gordon'    , enablelist: [], disablelist: []},
	{value: 'Gromos43A1', enablelist: [], disablelist: []},
	{value: 'HardSphere', enablelist: [], disablelist: []},
	{value: 'Hoyt2003'  , enablelist: [], disablelist: []},
	{value: 'Jaramillo' , enablelist: [], disablelist: []},
	{value: 'KFvBvS'    , enablelist: [], disablelist: []},
	{value: 'Last1993'  , enablelist: [], disablelist: []},
	{value: 'LGM'       , enablelist: [], disablelist: []},
	{value: 'LJium'     , enablelist: [], disablelist: []},
	{value: 'MCY1976'   , enablelist: [], disablelist: []},
	{value: 'Mend2003'  , enablelist: [], disablelist: []},
	{value: 'mgmstereo' , enablelist: [], disablelist: []},
	{value: 'MM2'       , enablelist: [], disablelist: []},
	{value: 'MMFF94'    , enablelist: [], disablelist: []},
	{value: 'Morrow2002', enablelist: [], disablelist: []},
	{value: 'NERDv1'    , enablelist: [], disablelist: []},
	{value: 'NERDv2'    , enablelist: [], disablelist: []},
	{value: 'NERDv3'    , enablelist: [], disablelist: []},
	{value: 'OPLS-1996' , enablelist: [], disablelist: []},
	{value: 'OPLS-2001' , enablelist: [], disablelist: []},
	{value: 'OPLS-aa'   , enablelist: [], disablelist: []},
	{value: 'OPLS-ua'   , enablelist: [], disablelist: []},
	{value: 'Pana1989'  , enablelist: [], disablelist: []},
	{value: 'ParkHijazi', enablelist: [], disablelist: []},
	{value: 'Potter1997', enablelist: [], disablelist: []},
	{value: 'QMFF-VIII' , enablelist: [], disablelist: []},
	{value: 'Richar1995', enablelist: [], disablelist: []},
	{value: 'Shah2004'  , enablelist: [], disablelist: []},
	{value: 'Shukla1987', enablelist: [], disablelist: []},
	{value: 'SKS'       , enablelist: [], disablelist: []},
	{value: 'Smith1994' , enablelist: [], disablelist: []},
	{value: 'SMMKmain'  , enablelist: [], disablelist: []},
	{value: 'SMMKnaip'  , enablelist: [], disablelist: []},
	{value: 'SPC-E'     , enablelist: [], disablelist: []},
	{value: 'SquareWell', enablelist: [], disablelist: []},
	{value: 'Stil1985'  , enablelist: [], disablelist: []},
	{value: 'Sum2003'   , enablelist: [], disablelist: []},
	{value: 'Tele1987'  , enablelist: [], disablelist: []},
	{value: 'TIP3P'     , enablelist: [], disablelist: []},
	{value: 'TIP4P'     , enablelist: [], disablelist: []},
	{value: 'TIP5P'     , enablelist: [], disablelist: []},
	{value: 'TraPPE-EH' , enablelist: [], disablelist: []},
	{value: 'TraPPE-UA' , enablelist: [], disablelist: []},
	{value: 'TraPPE-UAf', enablelist: [], disablelist: []},
	{value: 'UFF'       , enablelist: [], disablelist: []},
	{value: 'Unlu2004'  , enablelist: [], disablelist: []},
	{value: 'Vega1992'  , enablelist: [], disablelist: []},
	{value: 'Vink2001'  , enablelist: [], disablelist: []},
	{value: 'Walt2001'  , enablelist: [], disablelist: []},
	{value: 'Weiner1984', enablelist: [], disablelist: []},
	{value: 'Weiner1986', enablelist: [], disablelist: []},
	{value: 'Wielop1985', enablelist: [], disablelist: []}
],
classical_mixrule: [
	{value: 'Lorentz-Berthelot', enablelist: [], disablelist: []},
	{value: 'Shukla'           , enablelist: [], disablelist: []},
	{value: 'Geometric'        , enablelist: [], disablelist: []},
	{value: 'Explicit'         , enablelist: [], disablelist: []},
	{value: 'Sixth Power'      , enablelist: [], disablelist: []},
	{value: 'MMFF'             , enablelist: [], disablelist: []},
	{value: 'LB plus manual'   , enablelist: [], disablelist: []},
	{value: 'Arithmetic'       , enablelist: [], disablelist: []}
],
interpolatestyle: [
	{value: 'cubicspline', enablelist: [], disablelist: []},
	{value: 'linear'     , enablelist: [], disablelist: []}
],
cmix_rescaling_style: [
	{value: 'none'     , enablelist: [], disablelist: []},
	{value: 'soft-core', enablelist: [], disablelist: []},
	{value: 'WCA'      , enablelist: [], disablelist: []}
]
};
