import { Button, Container, TextField } from "@mui/material";
import { Stack } from "@mui/material";
import React from "react";
import "./LoginStyle.css";

function Rightsect() {
	return (
		<div className="right-sect">
			<Container>
				<Stack spacing={5}>
					<h2>Вход</h2>

					<TextField label="Email" type="email" variant="filled" />
					<TextField label="Пароль" type="password" variant="filled" />
					<Button variant="contained">Войти</Button>
				</Stack>
			</Container>
		</div>
	);
}

export default Rightsect;
