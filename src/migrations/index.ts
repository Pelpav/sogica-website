import * as migration_20260829_001807_homepage_blocks_v2 from './20260829_001807_homepage_blocks_v2';
import * as migration_20260829_003600_intro_composed from './20260829_003600_intro_composed';
import * as migration_20260829_005920_design_overhaul_blocks from './20260829_005920_design_overhaul_blocks';
import * as migration_20260829_010609_construktion_v1 from './20260829_010609_construktion_v1';

export const migrations = [
  {
    up: migration_20260829_001807_homepage_blocks_v2.up,
    down: migration_20260829_001807_homepage_blocks_v2.down,
    name: '20260829_001807_homepage_blocks_v2',
  },
  {
    up: migration_20260829_003600_intro_composed.up,
    down: migration_20260829_003600_intro_composed.down,
    name: '20260829_003600_intro_composed',
  },
  {
    up: migration_20260829_005920_design_overhaul_blocks.up,
    down: migration_20260829_005920_design_overhaul_blocks.down,
    name: '20260829_005920_design_overhaul_blocks',
  },
  {
    up: migration_20260829_010609_construktion_v1.up,
    down: migration_20260829_010609_construktion_v1.down,
    name: '20260829_010609_construktion_v1'
  },
];
