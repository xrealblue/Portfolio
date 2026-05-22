const AnimeLoader = () => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 1800)
        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null

    return (
        <div
            className="fixed inset-0 z-50 bg-black flex items-end justify-end overflow-hidden"
            style={{
                clipPath: visible ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                transition: 'clip-path 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
            }}
        >
            {/* Diagonal yellow squares sliding off top-right to bottom-left */}
            {[...Array(7)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-yellow-400"
                    style={{
                        width: '140px',
                        height: '140px',
                        top: `${-80 + i * 60}px`,
                        right: `${-80 + i * 60}px`,
                        transform: 'rotate(45deg)',
                        opacity: 1 - i * 0.12,
                        animation: `slashOut 1.8s cubic-bezier(0.76, 0, 0.24, 1) ${i * 60}ms forwards`,
                    }}
                />
            ))}

            {/* Anime list text */}
            <div className="absolute inset-0 flex flex-col justify-center px-12 overflow-hidden">
                <div className="flex flex-col mono uppercase">
                    {Anime.slice(0, 12).map((anime, i) => (
                        <div
                            key={i}
                            className="text-white/60 text-sm overflow-hidden"
                            style={{
                                animation: `fadeUp 1.8s ease ${i * 40}ms both`,
                            }}
                        >
                            {anime.name}
                        </div>
                    ))}
                    <div className="text-white/20 text-sm mt-1">+{Anime.length - 12} more</div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slashOut {
                    0% { transform: rotate(45deg) translate(0, 0); opacity: 1; }
                    100% { transform: rotate(45deg) translate(300px, -300px); opacity: 0; }
                }
                @keyframes fadeUp {
                    0% { opacity: 0; transform: translateY(12px); }
                    40% { opacity: 1; transform: translateY(0); }
                    80% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `}</style>
        </div>
    )
}