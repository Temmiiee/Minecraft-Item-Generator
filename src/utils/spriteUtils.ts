export const getSpriteStyle = (spriteClass: string, x: number, y: number) => {
  let spriteSheet = '';
  const baseUrl = import.meta.env.BASE_URL;

  switch (spriteClass) {
    case 'block-sprite':
      spriteSheet = `${baseUrl}img/BlockCSS.png`;
      break;
    case 'block-sprite2':
      spriteSheet = `${baseUrl}img/BlockCSS2.png`;
      break;
    case 'item-sprite':
      spriteSheet = `${baseUrl}img/ItemCSS.png`;
      break;
    case 'block-sprite3':
      spriteSheet = `${baseUrl}img/BlockCSS_1.20.png`;
      break;
    default:
      spriteSheet = '';
  }

  return {
    backgroundImage: `url(${spriteSheet})`,
    backgroundPosition: `${x}px ${y}px`,
    width: '16px',
    height: '16px',
    display: 'inline-block',
  };
};
