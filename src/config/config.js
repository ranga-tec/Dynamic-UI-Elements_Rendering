// Different view types available in the application
export const VIEW_TYPES = {
    LIST: 'list',
    BOARD: 'board',
    CALENDAR: 'calendar',
    GRID: 'grid'
  };
  
  // Configuration for each view type
  export const VIEW_CONFIG = {
    [VIEW_TYPES.LIST]: {
      name: 'List View',
      icon: 'ListIcon',
      component: 'TaskList'
    },
    [VIEW_TYPES.BOARD]: {
      name: 'Board View',
      icon: 'BoardIcon',
      component: 'TaskBoard'
    },
    [VIEW_TYPES.GRID]: {
      name: 'Grid View',
      icon: 'GridIcon',
      component: 'TaskGrid'
    }
  };