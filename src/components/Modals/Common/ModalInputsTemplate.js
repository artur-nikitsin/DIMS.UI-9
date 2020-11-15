export const userModalConfiguration = {
  firstName: { type: 'text', isDefaultValid: false },
  lastName: { type: 'text', isDefaultValid: false },
  birthDate: { type: 'date', isDefaultValid: false },
  directionId: { type: 'text', isDefaultValid: true },
  education: { type: 'text', isDefaultValid: false },
  startDate: { type: 'date', isDefaultValid: false },
  email: { type: 'email', isDefaultValid: false },
  university: { type: 'text', isDefaultValid: false },
  mathScore: { type: 'text', isDefaultValid: false },
  address: { type: 'text', isDefaultValid: false },
  mobilePhone: { type: 'text', isDefaultValid: false },
  skype: { type: 'text', isDefaultValid: true },
  sex: { type: 'text', isDefaultValid: false },
};

export const taskModalConfiguration = {
  name: { type: 'text', isDefaultValid: false },
  startDate: { type: 'text', isDefaultValid: false },
  deadlineDate: { type: 'text', isDefaultValid: false },
  description: { type: 'text', isDefaultValid: false },
  executors: { type: 'text', isDefaultValid: true },
};

export const trackModalConfiguration = {
  trackDate: { type: 'text', isDefaultValid: false },
  trackNote: { type: 'text', isDefaultValid: false },
};
