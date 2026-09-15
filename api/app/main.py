from fastapi import FastAPI
from app.core.exceptions import registar_handler
from app.controllers.usuario_controller import router as usuario_router


app = FastAPI()

#Traduz as exceções de dominio (app/core/exceptions.py) para respostas HTTP padronizadas
registar_handler(app)

app.include_router(usuario_router)


# Executar
# uvicorn app.main:app --reload