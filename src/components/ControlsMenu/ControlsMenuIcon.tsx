import { ReactComponent as Icon_CIRCLE } from '../../assets/svg/menu_circle.svg';
import { ReactComponent as Icon_CIRCLE_OUTLINE } from '../../assets/svg/menu_circle_outline.svg';
import { ReactComponent as Icon_SQUARE } from '../../assets/svg/menu_square.svg';
import { ReactComponent as Icon_SQUARE_OUTLINE } from '../../assets/svg/menu_square_outline.svg';
import { ReactComponent as Icon_CROSS } from '../../assets/svg/menu_cross.svg';
import { ReactComponent as Icon_CROSS_OUTLINE } from '../../assets/svg/menu_cross_outline.svg';
import { ReactComponent as Icon_DIAMOND } from '../../assets/svg/menu_diamond.svg';
import { ReactComponent as Icon_DIAMOND_OUTLINE } from '../../assets/svg/menu_diamond_outline.svg';
import { ReactComponent as Icon_TRIANGLE } from '../../assets/svg/menu_triangle.svg';
import { ReactComponent as Icon_TRIANGLE_OUTLINE } from '../../assets/svg/menu_triangle_outline.svg';
import { ReactComponent as Icon_BARRE } from '../../assets/svg/menu_barre.svg';
import { ReactComponent as Icon_BARRE_OUTLINE } from '../../assets/svg/menu_barre_outline.svg';
import { ReactComponent as Icon_BARRE_SQUARE } from '../../assets/svg/menu_sbarre.svg';
import { ReactComponent as Icon_BARRE_SQUARE_OUTLINE } from '../../assets/svg/menu_sbarre_outline.svg';

import { ControlsMenuDisplaySymbolsType } from '../../store/controls.slice';

const ControlsMenuIcon = ({ symbol }: { symbol: ControlsMenuDisplaySymbolsType }) => {
  const symbolIcons: Record<ControlsMenuDisplaySymbolsType, JSX.Element> = {
    CIRCLE: <Icon_CIRCLE className='fill-current' />,
    SQUARE: <Icon_SQUARE className='fill-current' />,
    DIAMOND: <Icon_DIAMOND className='fill-current' />,
    TRIANGLE: <Icon_TRIANGLE className='fill-current' />,
    CROSS: <Icon_CROSS className='fill-current' />,
    CIRCLE_OUTLINE: <Icon_CIRCLE_OUTLINE className='fill-current' />,
    SQUARE_OUTLINE: <Icon_SQUARE_OUTLINE className='fill-current' />,
    DIAMOND_OUTLINE: <Icon_DIAMOND_OUTLINE className='fill-current' />,
    TRIANGLE_OUTLINE: <Icon_TRIANGLE_OUTLINE className='fill-current' />,
    CROSS_OUTLINE: <Icon_CROSS_OUTLINE className='fill-current' />,
    BARRE: <Icon_BARRE className='fill-current' />,
    BARRE_OUTLINE: <Icon_BARRE_OUTLINE className='fill-current' />,
    BARRE_SQUARE: <Icon_BARRE_SQUARE className='fill-current' />,
    BARRE_SQUARE_OUTLINE: <Icon_BARRE_SQUARE_OUTLINE className='fill-current' />,
  };
  return symbolIcons[symbol];
};

export default ControlsMenuIcon;
