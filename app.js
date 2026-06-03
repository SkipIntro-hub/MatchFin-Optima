const layerInsights = {
    "layer-1": {
        title: "Capa 1 - Datos",
        copy: "Conecta fuentes oficiales, privadas y documentales para crear una base unificada por CUIT, con procedencia y normalizacion.",
        tags: ["NOSIS/BCRA/AFIP", "Balances", "APIs privadas", "Registros publicos"]
    },
    "layer-2": {
        title: "Capa 2 - Legibilidad",
        copy: "Convierte informacion fragmentada en una lectura financiera comprensible: salud, liquidez, covenants, ratios y anomalias relevantes.",
        tags: ["Health score", "Psi", "Covenant vivo", "Score contextual"]
    },
    "layer-3": {
        title: "Capa 3 - Observabilidad",
        copy: "Reemplaza la foto estatica por monitoreo continuo. La plataforma detecta cambios de riesgo, eventos y desvio de variables criticas.",
        tags: ["Alertas", "Eventos", "Carteras", "Seguimiento diario"]
    },
    "layer-4": {
        title: "Capa 4 - Prediccion",
        copy: "Proyecta escenarios de comportamiento crediticio para anticipar impago, estres de caja, drift y ruptura de condiciones.",
        tags: ["Monte Carlo", "Stress testing", "Breach probability", "Escenarios"]
    },
    "layer-5": {
        title: "Capa 5 - IA cognitiva",
        copy: "Usa IA para investigar noticias, expedientes, documentos y contexto, y para explicar por que una recomendacion tiene sentido.",
        tags: ["NLP", "Copiloto", "Explicabilidad", "Investigacion contextual"]
    },
    "layer-6": {
        title: "Capa 6 - Decision",
        copy: "Transforma inteligencia en accion: politicas, overrides, recomendacion, comite, memoria historica y auditoria completa.",
        tags: ["Decision auditable", "Overrides", "Comite", "Trazabilidad"]
    }
};

const marketInsights = {
    "market-a": {
        title: "Mercado A - Instituciones financieras",
        copy: "El mismo motor reduce riesgo operativo y normativo en entidades que necesitan procesos robustos, trazabilidad y coordinacion entre equipos.",
        tags: ["SaaS anual", "Compliance", "Credit management", "Auditoria"]
    },
    "market-b": {
        title: "Mercado B - Empresas on-demand",
        copy: "La infraestructura se empaqueta para empresas que necesitan evaluar clientes y proveedores sin montar un equipo de riesgo financiero completo.",
        tags: ["Packs", "Procurement", "Cobranzas", "Tenant privado"]
    }
};

const relationMap = {
    "market-a": ["layer-1", "layer-2", "layer-3", "layer-4", "layer-5", "layer-6"],
    "market-b": ["layer-1", "layer-2", "layer-3", "layer-4", "layer-5", "layer-6"],
    "layer-1": ["market-a", "market-b"],
    "layer-2": ["market-a", "market-b"],
    "layer-3": ["market-a", "market-b"],
    "layer-4": ["market-a", "market-b"],
    "layer-5": ["market-a", "market-b"],
    "layer-6": ["market-a", "market-b"]
};

const demoSteps = [
    {
        title: "Ingreso de datos",
        copy: "Carga inicial del tenant con fuentes, documentos e identificadores que luego quedan disponibles para analisis y consulta."
    },
    {
        title: "Autogestion / onboarding",
        copy: "Registro, validacion, permisos, parametros de alerta y configuracion del entorno operativo."
    },
    {
        title: "Carga / consulta de CUIT",
        copy: "El analista consulta una empresa puntual por carga manual, API o carga masiva; el sistema consolida fuentes por CUIT."
    },
    {
        title: "Investigacion IA",
        copy: "La IA busca, clasifica y resume informacion externa: noticias, juicios, redes, documentos y senales contextuales."
    },
    {
        title: "Analisis integral",
        copy: "Combina score, QAMT, ratios, covenants, riesgo fiscal, senales contextuales y trazabilidad de fuentes."
    },
    {
        title: "Prediccion y escenarios",
        copy: "Modela estabilidad futura, probabilidad de desvio, escenarios de plazo, stress testing y sensibilidad operativa."
    },
    {
        title: "Recomendacion IA",
        copy: "Sugiere acciones, condiciones, limites y explicaciones para que el analista decida con mejor contexto."
    },
    {
        title: "Decision / accion",
        copy: "Registra la decision, activa monitoreo, alertas, memoria historica y seguimiento posterior del caso."
    }
];

const insightTitle = document.getElementById("insight-title");
const insightCopy = document.getElementById("insight-copy");
const insightTags = document.getElementById("insight-tags");
const layerCards = document.querySelectorAll(".layer-card");
const marketCards = document.querySelectorAll(".market-card");
const demoStepButtons = document.querySelectorAll(".step");
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const workflowKicker = document.getElementById("workflow-kicker");
const workflowTitle = document.getElementById("workflow-title");
const workflowCopy = document.getElementById("workflow-copy");

function clearArchitectureHighlights() {
    [...layerCards, ...marketCards].forEach((el) => {
        el.classList.remove("selected-focus", "related-active", "noise-muted");
    });
}

function setInsight(target) {
    const data = layerInsights[target] || marketInsights[target];
    if (!data) return;

    insightTitle.textContent = data.title;
    insightCopy.textContent = data.copy;
    insightTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join("");

    clearArchitectureHighlights();

    [...layerCards, ...marketCards].forEach((el) => {
        if (el.dataset.target !== target) {
            el.classList.add("noise-muted");
        }
    });

    const selected = document.querySelector(`[data-target="${target}"]`);
    if (selected) {
        selected.classList.remove("noise-muted");
        selected.classList.add("selected-focus");
    }

    (relationMap[target] || []).forEach((relatedTarget) => {
        const related = document.querySelector(`[data-target="${relatedTarget}"]`);
        if (related) {
            related.classList.remove("noise-muted");
            related.classList.add("related-active");
        }
    });
}

function renderDemoStep(index) {
    const step = demoSteps[index];
    workflowKicker.textContent = `Instancia ${index + 1}`;
    workflowTitle.textContent = step.title;
    workflowCopy.textContent = step.copy;

    demoStepButtons.forEach((button) => {
        button.classList.toggle("selected-focus", Number(button.dataset.step) === index);
    });
}

function renderAssistantIntro() {
    chatMessages.innerHTML = `
        <div class="chat-bubble ai-bubble assistant-intro">
            <p class="bubble-meta">Canal abierto</p>
            <p class="bubble-text"><strong>Contexto activo del CUIT 30-74891253-9.</strong> Consultame sobre fuentes, hallazgos, riesgo, operacion o uso de MatchFin.</p>
        </div>
        <div class="suggestion-row" aria-label="Preguntas sugeridas">
            <button type="button" data-question="Que fuentes se usaron para este CUIT?">Fuentes usadas</button>
            <button type="button" data-question="Tiene deudas o cheques rechazados?">AFIP / BCRA</button>
            <button type="button" data-question="Que juicios activos aparecen?">Juicios</button>
            <button type="button" data-question="Conviene venderle a 60 dias?">Plazo 60 dias</button>
            <button type="button" data-question="Que limite sugeris y como lo monitoreo?">Limite y monitoreo</button>
        </div>
    `;

    document.querySelectorAll(".suggestion-row button").forEach((button) => {
        button.addEventListener("click", () => {
            chatInput.value = button.dataset.question;
            chatForm.requestSubmit();
        });
    });
}

function appendBubble(kind, meta, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${kind === "user" ? "user-bubble" : "ai-bubble"}`;
    bubble.innerHTML = `
        <p class="bubble-meta">${meta}</p>
        <p class="bubble-text">${text}</p>
    `;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function answerAnalystQuestion(rawText) {
    const text = rawText.toLowerCase();

    if (text.includes("fuente") || text.includes("origen") || text.includes("datos") || text.includes("multifuente")) {
        return "Para este CUIT se acumulan fuentes fiscales, BCRA, registros publicos, balances, documentos cargados en el tenant, eventos externos y senales no estructuradas procesadas por IA.";
    }

    if (text.includes("afip") || text.includes("bcra") || text.includes("deuda") || text.includes("cheque") || text.includes("rechaz")) {
        return "AFIP no muestra deuda activa y BCRA informa situacion 1. La senal crediticia base es normal, aunque el analisis integral mantiene una alerta por contingencias legales.";
    }

    if (text.includes("juicio") || text.includes("demanda") || text.includes("legal") || text.includes("expediente") || text.includes("proveedor")) {
        return "La investigacion IA detecta 3 demandas comerciales activas por $14M. No bloquean automaticamente la operacion, pero reducen el indice Psi y justifican condiciones mas conservadoras.";
    }

    if (text.includes("60") || text.includes("90") || text.includes("plazo") || text.includes("dias") || text.includes("caja") || text.includes("impago") || text.includes("escenario")) {
        return "El escenario a 60 dias eleva la probabilidad de descalce al 42%. La alternativa sugerida es operar a 30 dias, donde el riesgo estimado cae a 8%.";
    }

    if (text.includes("limite") || text.includes("cupo") || text.includes("monto") || text.includes("aprobar") || text.includes("recomend")) {
        return "La recomendacion es una aprobacion condicionada: limite de $8M a 30 dias, con monitoreo activo y revision si aparecen nuevas demandas o deterioro fiscal.";
    }

    if (text.includes("monitoreo") || text.includes("alerta") || text.includes("seguimiento") || text.includes("tracking")) {
        return "El monitoreo queda activo sobre AFIP, BCRA, nuevas demandas, variacion de liquidez e indice de salud. Cada alerta queda vinculada al legajo y a la decision original.";
    }

    if (text.includes("cargar") || text.includes("archivo") || text.includes("balance") || text.includes("tenant") || text.includes("onboarding")) {
        return "La carga inicial puede entrar por tenant privado, API o carga masiva. Luego se normalizan balances, identificadores fiscales, fuentes oficiales y documentos de soporte.";
    }

    return "Puedo responder sobre carga de datos, onboarding, AFIP/BCRA, juicios, score, escenarios de plazo, cupo recomendado y monitoreo posterior.";
}

layerCards.forEach((card) => {
    card.addEventListener("click", () => setInsight(card.dataset.target));
});

marketCards.forEach((card) => {
    card.addEventListener("click", () => setInsight(card.dataset.target));
});

demoStepButtons.forEach((button) => {
    button.addEventListener("click", () => renderDemoStep(Number(button.dataset.step)));
});

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const rawText = chatInput.value.trim();
    if (!rawText) return;

    chatInput.value = "";
    appendBubble("user", "Analista financiero", rawText);

    window.setTimeout(() => {
        appendBubble("ai", "MatchFin Assistant", answerAnalystQuestion(rawText));
    }, 220);
});

setInsight("layer-1");
renderDemoStep(0);
renderAssistantIntro();
