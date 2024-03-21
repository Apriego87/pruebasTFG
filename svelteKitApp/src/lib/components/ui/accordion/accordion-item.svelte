<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js.js";

	type $$Props = AccordionPrimitive.ItemProps;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"];
</script>

<AccordionPrimitive.Item {value} {...$$restProps}>
	<slot />
</AccordionPrimitive.Item>
