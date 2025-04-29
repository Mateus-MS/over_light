export function ComposeComponents(Base, ...mixins) {
    return mixins.reduce((base, mixin) => mixin(base), Base);
}
