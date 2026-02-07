export function Header() {
    return(
        <header>
            <h2>DevJobs</h2>
            <nav>
                <a href="/">Inicio</a>
                <a href="/search">Empleos</a>
            </nav>

            <div>
                <a href="">Subir CV</a>
                <devjobs-avatar></devjobs-avatar>
            </div>
        </header>
    )
}