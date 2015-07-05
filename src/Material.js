Material = function ( material ) {
    if ( material instanceof( Material ) ) {
        this.copy( material );
    }

    material = ( material !== undefined ) ? material : {};

    // https://en.wikipedia.org/wiki/Phong_reflection_model
    // ks (R'.V')^α im,s
    // the α = glossy. more glossy, more importance of angle.
    this.glossy = ( material.glossy !== undefined ) ? material.glossy : 0;
    this.refractable = ( material.refractable !== undefined ) ? material.refractable : false;

    //  let in_v, norm, out_v are defined and normalized
    //
    //      α * in_v + β * norm = out_v, then refract_n = β / α
    //
    //      e.g. in_v + 0 * norm (refract_n = 0) => no refract
    //      e.g. in_v + 3 * norm (refract_n = 3) => refract into bigger density
    //      e.g. in_v + -3 * norm (refract_n = -3) => refract into smaller density
    this.refract_n = ( material.refract_n !== undefined && this.refractable ) ? material.refract_n : 0;
    this.color = ( material.color !== undefined ) ? material.color : new Color( 0x000000 );

    this.ka = ( material.ka !== undefined ) ? material.ka : new Color( 1, 1, 1 );
    this.kd = ( material.kd !== undefined ) ? material.kd : new Color( 1, 1, 1 );
    this.ks = ( material.ks !== undefined ) ? material.ks : new Color( 1, 1, 1 );
    this.phongK = [ this.ka, this.kd, this.ks ];
}

Material.prototype.constructor = Material;

Material.prototype.copy = function ( m ) {
    this.glossy = m.glossy;
    this.refractable = m.refractable;
    this.refract_n = m.refract_n;
    this.color.copy( m.color );
    this.ka.copy( m.ka );
    this.kd.copy( m.kd );
    this.ks.copy( m.ks );
    this.phongK = [ this.ka, this.kd, this.ks ];
}
