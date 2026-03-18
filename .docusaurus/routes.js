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
    path: '/fully-connected-neural-network-heat-equation',
    component: ComponentCreator('/fully-connected-neural-network-heat-equation', '06e'),
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
    path: '/tags',
    component: ComponentCreator('/tags', '626'),
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
    path: '/tags/matlab',
    component: ComponentCreator('/tags/matlab', '505'),
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
    path: '/tags/python',
    component: ComponentCreator('/tags/python', 'adc'),
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
    component: ComponentCreator('/', '417'),
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
