declare module 'react-simple-maps' {
  import { ComponentType, SVGProps } from 'react';

  export interface ComposableMapProps extends SVGProps<SVGGElement> {
    projection?: string | Function;
    projectionConfig?: object;
    width?: number;
    height?: number;
    style?: object;
    className?: string;
    showGraticule?: boolean;
    graticuleProps?: object;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;

  export interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: any[] }) => JSX.Element | JSX.Element[];
  }

  export const Geographies: ComponentType<GeographiesProps>;

  export interface GeographyProps {
    geography: any;
    style?: {
      default?: object;
      hover?: object;
      pressed?: object;
    };
    className?: string;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
  }

  export const Geography: ComponentType<GeographyProps>;
}