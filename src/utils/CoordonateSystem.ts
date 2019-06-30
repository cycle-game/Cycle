export const placement = (degrees: number, rayon: number): [number, number, number] => {
    // ------------------------------------------------------------------ \\
    // On aurait pu utiliser les pivots, mais le rendu est beaucoup moins
    // bien (pivots ==> sprite.pivot.x)

    // On commence le level en haut au milieu.
    // Et pusiqu'on donne la variable en degrée ...
    const radian = ((degrees - 90) * Math.PI) / 180;

    // Ainsi on obtient miraculeusement les valeurs x/y
    const pos_x = rayon * Math.cos(radian);
    const pos_y = rayon * Math.sin(radian);

    // ------------------------------------------------------------------ //

    // Maintenant on place la plateforme (dans le groupe des plateformes)
    return [pos_x, pos_y, degrees];
};
