export const uiHelpers = {
  getFeaturesForRole: (roleName, uiMetadata) => {
    const rolePerms = uiMetadata?.rolePermissions?.[roleName];
    return Array.isArray(rolePerms?.features) ? rolePerms.features : [];
  },

  getFormsForRole: (roleName, uiMetadata) => {
    const rolePerms = uiMetadata?.rolePermissions?.[roleName];
    const allowed = Array.isArray(rolePerms?.allowedEntities)
      ? rolePerms.allowedEntities
      : [];

    return allowed.map((entityName) => ({
      entityName,
      fields: Array.isArray(uiMetadata?.formConfig?.[entityName]?.fields)
        ? uiMetadata.formConfig[entityName].fields
        : [],
    }));
  },
};
