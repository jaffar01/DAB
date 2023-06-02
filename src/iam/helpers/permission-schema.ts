export const permissionValidationSchema = {
  type: 'array',
    properties: {
      moduleKey: {
        type: 'string',
      },
      type:{
        type:'string'
      },
      actionsPermitted: {
        type: 'array',
        items:{type:'string'}
      },
    },
    required: ['moduleKey', 'actionsPermitted'],
    additionalProperties: false,
  uniqueItems: true,
};
