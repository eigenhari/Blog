import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/2024/10/19/2024/ lie group',
    component: ComponentCreator('/2024/10/19/2024/ lie group', '38e'),
    exact: true
  },
  {
    path: '/archive',
    component: ComponentCreator('/archive', '51a'),
    exact: true
  },
  {
    path: '/authors',
    component: ComponentCreator('/authors', '498'),
    exact: true
  },
  {
    path: '/Ball and beam balance',
    component: ComponentCreator('/Ball and beam balance', '5c9'),
    exact: true
  },
  {
    path: '/finite-state-machine',
    component: ComponentCreator('/finite-state-machine', '710'),
    exact: true
  },
  {
    path: '/fully-connected-neural-network-heat-equation',
    component: ComponentCreator('/fully-connected-neural-network-heat-equation', '06e'),
    exact: true
  },
  {
    path: '/Geometric controlled reduction',
    component: ComponentCreator('/Geometric controlled reduction', '6a6'),
    exact: true
  },
  {
    path: '/hybrid-zero-dynamics',
    component: ComponentCreator('/hybrid-zero-dynamics', '23d'),
    exact: true
  },
  {
    path: '/impedance-control',
    component: ComponentCreator('/impedance-control', 'd41'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/mathematical-modeling-francis-turbine',
    component: ComponentCreator('/mathematical-modeling-francis-turbine', 'd9d'),
    exact: true
  },
  {
    path: '/simulation-prosthetic-leg',
    component: ComponentCreator('/simulation-prosthetic-leg', '1e9'),
    exact: true
  },
  {
    path: '/tags',
    component: ComponentCreator('/tags', '626'),
    exact: true
  },
  {
    path: '/tags/biomechanics',
    component: ComponentCreator('/tags/biomechanics', '0fc'),
    exact: true
  },
  {
    path: '/tags/bipedal-locomotion',
    component: ComponentCreator('/tags/bipedal-locomotion', 'd2a'),
    exact: true
  },
  {
    path: '/tags/control-systems',
    component: ComponentCreator('/tags/control-systems', '28e'),
    exact: true
  },
  {
    path: '/tags/fsm',
    component: ComponentCreator('/tags/fsm', '40c'),
    exact: true
  },
  {
    path: '/tags/geometrics-reduction-control',
    component: ComponentCreator('/tags/geometrics-reduction-control', 'ec4'),
    exact: true
  },
  {
    path: '/tags/hzd',
    component: ComponentCreator('/tags/hzd', 'd93'),
    exact: true
  },
  {
    path: '/tags/impedance-control',
    component: ComponentCreator('/tags/impedance-control', '343'),
    exact: true
  },
  {
    path: '/tags/machine-learning',
    component: ComponentCreator('/tags/machine-learning', 'eaa'),
    exact: true
  },
  {
    path: '/tags/math',
    component: ComponentCreator('/tags/math', '708'),
    exact: true
  },
  {
    path: '/tags/mathematics',
    component: ComponentCreator('/tags/mathematics', 'c97'),
    exact: true
  },
  {
    path: '/tags/matlab',
    component: ComponentCreator('/tags/matlab', '505'),
    exact: true
  },
  {
    path: '/tags/mechanics',
    component: ComponentCreator('/tags/mechanics', '5a4'),
    exact: true
  },
  {
    path: '/tags/modeling',
    component: ComponentCreator('/tags/modeling', '04e'),
    exact: true
  },
  {
    path: '/tags/optimization',
    component: ComponentCreator('/tags/optimization', 'cc3'),
    exact: true
  },
  {
    path: '/tags/pde',
    component: ComponentCreator('/tags/pde', 'b96'),
    exact: true
  },
  {
    path: '/tags/pinns',
    component: ComponentCreator('/tags/pinns', '610'),
    exact: true
  },
  {
    path: '/tags/prosthetics',
    component: ComponentCreator('/tags/prosthetics', '521'),
    exact: true
  },
  {
    path: '/tags/python',
    component: ComponentCreator('/tags/python', 'adc'),
    exact: true
  },
  {
    path: '/tags/robotics',
    component: ComponentCreator('/tags/robotics', '4a4'),
    exact: true
  },
  {
    path: '/tags/simulation',
    component: ComponentCreator('/tags/simulation', 'a38'),
    exact: true
  },
  {
    path: '/tags/turbine',
    component: ComponentCreator('/tags/turbine', '871'),
    exact: true
  },
  {
    path: '/tags/tutorial',
    component: ComponentCreator('/tags/tutorial', 'dd2'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '646'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'a10'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '117'),
            routes: [
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '44d'),
                exact: true,
                sidebar: "defaultSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'f56'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
