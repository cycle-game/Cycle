export const polarToCartesian = (angleInDegrees: number, rayon: number): [number, number] => {
    // ------------------------------------------------------------------ \\
    // On aurait pu utiliser les pivots, mais le rendu est beaucoup moins
    // bien (pivots ==> sprite.pivot.x)

    // On commence le level en haut au milieu.
    // Et pusiqu'on donne la variable en degrée ...
    const angleInRadian = ((angleInDegrees - 90) * Math.PI) / 180;

    const x = rayon * Math.cos(angleInRadian);
    const y = rayon * Math.sin(angleInRadian);

    return [x, y];
};
