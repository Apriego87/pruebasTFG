<script lang="ts">
	import { Button } from '$lib/components/ui/button'
	import { Label } from '$lib/components/ui/label'
	import { Input } from '$lib/components/ui/input'
	import * as Card from '$lib/components/ui/card'
</script>

<main class="flex items-center justify-center">
	<div class="w-1/2">
		<Card.Root>
			<Card.Header>
				<Card.Title>
                    Inicio de Sesión
                </Card.Title>
			</Card.Header>
			<Card.Content>
				<form method="POST" class="w-full">
					<Label for="username">Usuario: </Label>
					<Input type="text" id="username" name="username" required />

					<Label for="password">Contraseña: </Label>
					<Input type="password" id="password" name="password" required />

					<Button class="mt-4" type="submit">Iniciar sesión</Button>
				</form>
			</Card.Content>
			<Card.Footer>
				<p>Todavía no tienes una cuenta? <a href="/register">Regístrate</a></p>
			</Card.Footer>
		</Card.Root>
	</div>
</main>

<style>
    main {
        height: 100vh;
    }
</style>