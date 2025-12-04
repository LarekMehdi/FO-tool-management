export const COLORS = [
    '#5B4FC7', // violet profond
    '#0F9C75', // vert doux
    '#F2A43A', // orange chaud
    '#E74C3C', // rouge doux
    '#3B71D1', // bleu moyen
    '#A14FC7', // violet moyen
    '#F2984B', // orange doux
    '#3CA374', // vert forêt
    '#C95B5B', // rouge clair
    '#4B83F2', // bleu doux
    '#B85FC7', // violet clair
    '#DFA83F', // jaune chaud
    '#8E44AD', // violet foncé
    '#27AE60', // vert forêt moyen
    '#E67E22', // orange foncé
    '#C0392B', // rouge profond
    '#3498DB', // bleu moyen lumineux
    '#9B59B6', // violet lumineux
    '#1ABC9C', // turquoise doux
    '#F39C12', // jaune orangé
    '#D35400', // orange terre
    '#2ECC71', // vert vif
    '#E74C3C', // rouge vif
    '#2980B9', // bleu classique
];

export function generateRandomColor(index: number): string {
    return COLORS[index % COLORS.length]!;
}