export const getStatusIcon = (status) => {
  const icons = {
    brouillon: "📝",
    disponible: "✅",
    active: "⭐",
  };
  return icons[status] || "📄";
};
