export const getSpriteStyle = (spriteClass: string, x: number, y: number) => {
  let spriteSheet = '';
  switch (spriteClass) {
    case 'block-sprite':
      spriteSheet = 'src/assets/img/BlockCSS.png';
      break;
    case 'block-sprite2':
      spriteSheet = 'src/assets/img/BlockCSS2.png';
      break;
    case 'item-sprite':
      spriteSheet = 'src/assets/img/ItemCSS.png';
      break;
    case 'block-sprite3':
      spriteSheet = 'src/assets/img/BlockCSS_1.20.png';
      break;
    default:
      spriteSheet = '';
  }

  return {
    backgroundImage: `url(${spriteSheet})`,
    backgroundPosition: `${x}px ${y}px`,
    width: '16px',
    height: '16px',
    display: 'inline-block'
  };
};