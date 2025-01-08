interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={`mx-auto max-w-[120rem] px-8 ${className ?? ''}`}>{children}</div>;
}
