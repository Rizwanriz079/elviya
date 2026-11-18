import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
}

export default function Container({
  as: Component = 'div',
  className = '',
  children,
  ...props
}: ContainerProps) {
  return (
    <Component className={`container-fluid ${className}`} {...props}>
      {children}
    </Component>
  );
}
