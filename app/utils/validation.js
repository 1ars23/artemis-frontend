export const validateSelection = (selectedBlocks, blockSettings) => {
    if (blockSettings === "single" && selectedBlocks.length > 1) {
      return "You can only select one block.";
    }
    if (blockSettings === "grouped" && selectedBlocks.length === 0) {
      return "Please select at least one block.";
    }
    return null; // No validation errors
  };
  