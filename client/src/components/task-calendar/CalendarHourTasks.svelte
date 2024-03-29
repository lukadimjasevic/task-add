<script lang="ts">
    import { helpers } from "@helpers";

    export let date: Date;
</script>

<td class="td-hour text-end">
    {helpers.date.getHourToString(date)}
</td>

<style>
    .td-hour {
        width: 7rem;
    }
</style>
