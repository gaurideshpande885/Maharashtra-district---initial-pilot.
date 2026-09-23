export function cropOptions(catalog) {
  if (!catalog) return [];
  return catalog.per_service?.crop?.crop_list || [];
}

export function districtOptions(catalog) {
  if (!catalog) return [];
  return catalog.per_service?.crop?.region_list || [];
}