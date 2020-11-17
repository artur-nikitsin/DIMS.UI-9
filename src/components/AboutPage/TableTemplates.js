export const RolesPermissions = [
  { permission: "Watch the Member's Manage Grid", admin: '+', mentor: '+', user: '-' },
  { permission: "Add, edit, and delete a member on Member's Manage Grid", admin: '+', mentor: '-', user: '-' },
  { permission: "Watch the Member's Progress Grid", admin: '+', mentor: '+', user: '-' },
  { permission: 'Watch  Tasks Manage grid', admin: '+', mentor: '+', user: '-' },
  { permission: 'Add, edit and delete a New task', admin: '+', mentor: '+', user: '-' },
  { permission: "Watch the Member's Tasks Manage grid", admin: '+', mentor: '+', user: '+' },
  { permission: "Set the Member's task state as Success or Fail", admin: '+', mentor: '+', user: '-' },
  { permission: 'Watch the Subtasks Manage grid of current Task', admin: '-', mentor: '-', user: '+' },
  { permission: 'Add, edit, and delete a Subtasks of the current Task', admin: '-', mentor: '-', user: '+' },
];

export const PermissionClasses = {
  '+': 'greenPermission',
  '-': 'redPermission',
};
