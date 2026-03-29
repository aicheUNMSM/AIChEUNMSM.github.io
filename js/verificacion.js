async function verificar() {
    const codigoInput = document.getElementById("codigo");
    const codigo = codigoInput.value.trim().toUpperCase();
    const resultado = document.getElementById("resultado");

    if (!codigo) {
        alert("Por favor, ingrese un código de verificación.");
        return;
    }

    // Pequeño feedback visual mientras carga
    resultado.innerHTML = '<p class="text-slate-400 text-center animate-pulse mt-6 font-medium">Conectando con la base de datos de AIChE...</p>';

    try {
        const res = await fetch("/data/certificados.json");
        const data = await res.json();

        const cert = data.find(c => c.codigo === codigo);

        if (cert) {
            resultado.innerHTML = `
                <div class="valido fade-in text-left">
                    
                    <div class="flex items-center gap-3 mb-5 border-b border-emerald-200 pb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <h3 class="text-xl md:text-2xl font-black text-emerald-800 uppercase tracking-wide">Certificado Auténtico</h3>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-emerald-900 text-sm md:text-base">
                        <div class="bg-white/60 p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <p class="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">Otorgado a</p>
                            <p class="font-bold text-slate-800">${cert.nombre}</p>
                        </div>
                        <div class="bg-white/60 p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <p class="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">Evento Académico</p>
                            <p class="font-bold text-slate-800">${cert.evento}</p>
                        </div>
                        <div class="bg-white/60 p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <p class="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">Fecha de Emisión</p>
                            <p class="font-bold text-slate-800">${cert.fecha}</p>
                        </div>
                        <div class="bg-white/60 p-4 rounded-xl border border-emerald-100 shadow-sm">
                            <p class="text-xs font-black uppercase tracking-widest text-emerald-600 mb-1">Calidad de Participación</p>
                            <p class="font-bold text-slate-800">${cert.tipo}</p>
                        </div>
                    </div>

                    <h4 class="font-black text-emerald-800 mb-3 text-sm uppercase tracking-widest">Vista del Documento Original:</h4>
                    
                    <div class="w-full h-[600px] md:h-[750px] rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-inner bg-slate-100 relative">
                        <iframe 
                            src="${cert.pdf}#toolbar=0&navpanes=0" 
                            class="w-full h-full border-none absolute inset-0"
                            title="Vista previa del certificado"
                        ></iframe>
                    </div>

                    <div class="mt-8 text-center flex justify-center">
                        <a href="${cert.pdf}" target="_blank" class="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-1 uppercase tracking-wide">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Descargar Certificado Original
                        </a>
                    </div>
                </div>
            `;
        } else {
            resultado.innerHTML = `
                <div class="invalido fade-in text-left">
                    <div class="flex items-center gap-3 mb-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-red-600"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        <h3 class="text-xl font-black text-red-800 uppercase tracking-wide">Código no encontrado</h3>
                    </div>
                    <p class="mt-2 text-red-700 text-sm font-medium">El código ingresado no existe en nuestra base de datos o fue escrito incorrectamente. Por favor, verifique el código impreso en su documento e intente nuevamente.</p>
                </div>
            `;
        }

    } catch (error) {
        resultado.innerHTML = `
            <div class="invalido fade-in text-center">
                <p class="font-bold text-red-800">Hubo un error de conexión al consultar la base de datos.</p>
            </div>
        `;
    }
}

/* Auto-verificación con QR (Lógica intacta) */
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");

    if (codigo) {
        document.getElementById("codigo").value = codigo;
        verificar();
    }
};
