export const userModalDefaultValid = {
  firstName: true,
  lastName: true,
  birthDate: true,
  directionId: false,
  education: true,
  startDate: true,
  email: true,
  university: false,
  mathScore: true,
  address: true,
  mobilePhone: true,
  skype: false,
  sex: true,
};

export const userModalTypes = {
  firstName: 'text',
  lastName: 'text',
  birthDate: 'date',
  directionId: 'text',
  education: 'text',
  startDate: 'date',
  email: 'email',
  university: 'text',
  mathScore: 'text',
  address: 'text',
  mobilePhone: 'text',
  skype: 'text',
  sex: 'text',
};

export const userModalConfiguration = {
  firstName: { type: 'text', isValidated: true },
  lastName: { type: 'text', isValidated: true },
  birthDate: { type: 'date', isValidated: true },
  directionId: { type: 'text', isValidated: false },
  education: { type: 'text', isValidated: true },
  startDate: { type: 'date', isValidated: true },
  email: { type: 'email', isValidated: true },
  university: { type: 'text', isValidated: true },
  mathScore: { type: 'text', isValidated: false },
  address: { type: 'text', isValidated: false },
  mobilePhone: { type: 'text', isValidated: true },
  skype: { type: 'text', isValidated: false },
  sex: { type: 'text', isValidated: false },
};

export const taskModalTemplate = {
  name: null,
  startDate: null,
  deadlineDate: null,
  description: null,
  executors: true,
};

export const taskModalValidation = {
  name: null,
  startDate: null,
  deadlineDate: null,
  description: true,
  executors: true,
};

export const taskModalTypes = {
  name: 'text',
  startDate: 'date',
  deadlineDate: 'date',
  description: 'text',
  executors: null,
};

export const trackModalTemplate = {
  trackDate: null,
  trackNote: null,
};

export const trackModalTypes = {
  trackDate: 'date',
  trackNote: 'text',
};
