async function verificar() {
    const codigo = document.getElementById("codigo").value.trim().toUpperCase();

    if (!codigo) {
        alert("Ingrese un código");
        return;
    }

    try {
        const res = await fetch("data/certificados.json");
        const data = await res.json();

        const cert = data.find(c => c.codigo === codigo);

        const resultado = document.getElementById("resultado");

        if (cert) {
            resultado.innerHTML = `
                <div class="valido">
                    <h3>✅ Certificado válido</h3>
                    <p><b>Nombre:</b> ${cert.nombre}</p>
                    <p><b>Evento:</b> ${cert.evento}</p>
                    <p><b>Fecha:</b> ${cert.fecha}</p>
                    <p><b>Tipo:</b> ${cert.tipo}</p>

                    <h4>Vista del certificado:</h4>

                    <iframe 
                        src="${cert.pdf}" 
                        width="100%" 
                        height="500px"
                        style="border:1px solid #ccc;">
                    </iframe>

                    <br><br>

                    <a href="${cert.pdf}" target="_blank">
                        Descargar certificado
                    </a>
                </div>
            `;
        } else {
            resultado.innerHTML = `
                <div class="invalido">
                    <h3>❌ Certificado no encontrado</h3>
                </div>
            `;
        }

    } catch (error) {
        document.getElementById("resultado").innerHTML =
            "<p>Error al cargar los datos</p>";
    }
}

/* Auto-verificación con QR */
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");

    if (codigo) {
        document.getElementById("codigo").value = codigo;
        verificar();
    }
};