const MEDICINE_LIBRARY = [
  { name: "Amoxicillin", aliases: ["amoxicillin", "amoxycillin", "mox"], isAntibiotic: true },
  { name: "Azithromycin", aliases: ["azithromycin", "azithral", "azitrom"], isAntibiotic: true },
  { name: "Cefixime", aliases: ["cefixime", "taxim o", "taxim"], isAntibiotic: true },
  { name: "Cefuroxime", aliases: ["cefuroxime", "ceftum"], isAntibiotic: true },
  { name: "Ciprofloxacin", aliases: ["ciprofloxacin", "ciplox"], isAntibiotic: true },
  { name: "Clindamycin", aliases: ["clindamycin"], isAntibiotic: true },
  { name: "Doxycycline", aliases: ["doxycycline", "doxy 1 ldr"], isAntibiotic: true },
  { name: "Levofloxacin", aliases: ["levofloxacin", "levoflox"], isAntibiotic: true },
  { name: "Metronidazole", aliases: ["metronidazole", "metrogyl"], isAntibiotic: true },
  { name: "Ofloxacin", aliases: ["ofloxacin", "oflox"], isAntibiotic: true },
  { name: "Paracetamol", aliases: ["paracetamol", "acetaminophen", "crocin", "calpol"], isAntibiotic: false },
  { name: "Ibuprofen", aliases: ["ibuprofen", "brufen"], isAntibiotic: false },
  { name: "Cetirizine", aliases: ["cetirizine", "okacet"], isAntibiotic: false },
  { name: "Pantoprazole", aliases: ["pantoprazole", "pantocid"], isAntibiotic: false },
  { name: "Omeprazole", aliases: ["omeprazole", "omez"], isAntibiotic: false },
];

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function titleCaseWords(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function findMedicineDefinition(value) {
  if (!value) {
    return null;
  }

  const normalizedValue = normalizeText(value);

  return (
    MEDICINE_LIBRARY.find((medicine) =>
      medicine.aliases.some((alias) => normalizedValue.includes(normalizeText(alias))),
    ) ?? null
  );
}

function recognizeMedicineNames(text) {
  if (!text.trim()) {
    return [];
  }

  const normalizedText = normalizeText(text);

  return MEDICINE_LIBRARY.filter((medicine) =>
    medicine.aliases.some((alias) => normalizedText.includes(normalizeText(alias))),
  );
}

function extractDose(text) {
  const doseMatch = text.match(/(\d+(?:\.\d+)?)\s*(mg|ml|mcg|g)/i);

  if (!doseMatch) {
    return "";
  }

  return `${doseMatch[1]} ${doseMatch[2].toLowerCase()}`;
}

function resolveMedicineDetails({ medicineName, recognitionText, isMarkedAntibiotic }) {
  const directMatch = findMedicineDefinition(medicineName);
  const recognizedMatch = recognizeMedicineNames(recognitionText)[0] ?? null;
  const matchedMedicine = directMatch ?? recognizedMatch;
  const fallbackName = medicineName.trim()
    ? titleCaseWords(medicineName.trim())
    : matchedMedicine?.name ?? "";

  return {
    isAntibiotic: Boolean(isMarkedAntibiotic || matchedMedicine?.isAntibiotic),
    matchedMedicine,
    normalizedName: normalizeText(fallbackName),
    suggestedDose: extractDose(recognitionText),
    medicineName: fallbackName,
  };
}

function formatMedicineDate(value) {
  if (!value) {
    return "Date not added";
  }

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildAntibioticAlerts(medicines) {
  const thresholdDays = 120;
  const thresholdCount = 2;
  const today = new Date();
  const groupedEntries = new Map();

  medicines.forEach((medicine) => {
    if (!medicine.isAntibiotic) {
      return;
    }

    const key = normalizeText(medicine.name);
    const existingEntries = groupedEntries.get(key) ?? [];
    groupedEntries.set(key, [...existingEntries, medicine]);
  });

  return [...groupedEntries.values()]
    .map((entries) => {
      const recentEntries = entries.filter((entry) => {
        if (!entry.takenOn) {
          return false;
        }

        const diffInDays = Math.floor((today - new Date(entry.takenOn)) / (1000 * 60 * 60 * 24));
        return diffInDays <= thresholdDays;
      });

      if (recentEntries.length < thresholdCount) {
        return null;
      }

      const sortedEntries = [...recentEntries].sort(
        (left, right) => new Date(right.takenOn) - new Date(left.takenOn),
      );
      const name = sortedEntries[0]?.name ?? "Antibiotic";

      return {
        count: sortedEntries.length,
        latestDate: sortedEntries[0]?.takenOn ?? "",
        message: `${name} was logged ${sortedEntries.length} times in the last ${thresholdDays} days. Repeated antibiotic use should be reviewed with a doctor.`,
        name,
        severity: sortedEntries.length >= 3 ? "high" : "medium",
      };
    })
    .filter(Boolean)
    .sort((left, right) => new Date(right.latestDate) - new Date(left.latestDate));
}

export {
  buildAntibioticAlerts,
  extractDose,
  formatMedicineDate,
  recognizeMedicineNames,
  resolveMedicineDetails,
};
