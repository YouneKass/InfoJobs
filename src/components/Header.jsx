import { Link } from "./Link";

export function Header() {
    return(
        <header>
            <h2>DevJobs</h2>
            <nav>
                <Link href="/">Inicio</Link>
                <Link href="/search">Empleos</Link>
            </nav>

            <div>
                <Link href="">Subir CV</Link>
            </div>
        </header>
    )
}