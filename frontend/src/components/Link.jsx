import { Link as NavLink } from "react-router" 
import { useRouter } from "../hooks/useRouter"


export function Link ({ href, children, className = "", ...restOfProps }) {

  const { currentPath } = useRouter()

  const isActive = currentPath === href
  const finalClassName = `${className} ${isActive ? "active" : ""}`.trim()

  return (
    <NavLink to={href} className={finalClassName} aria-current={isActive ? "page" : undefined} {...restOfProps}>
      {children}
    </NavLink>
  )
}