import React, { ReactNode } from 'react'
import cn from 'classnames'
interface ViewProps {
    children: ReactNode
}
const calculClass = ({ className }: any) => {
    return cn('bg-white float-left w-full mp-8 shadow-lg', className)
}
/*

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
 className,
  ...props
}) => {
  return (
    <input className={calculClass({className})} {...props} />
    );
};
   
export default Input
*/
const View = ({ children }: ViewProps) => {
    const c: string = ''
    return <section className={calculClass({ c })}>{children}</section>
}

export default View