<script lang="ts">
    import { LayoutPage } from "../components/common/layouts";
    import Card from "../components/common/Card.svelte";
    import TaskAdd from "../components/task-dashboard/TaskAdd.svelte";
    import TaskToolbar from "../components/task-dashboard/TaskToolbar.svelte";
    import TaskListView from "../components/task-dashboard/TaskListView.svelte";
</script>

<LayoutPage>
    <Card useHeader={false}>
        <div slot="body">
            <TaskAdd />
        </div>
    </Card>
    <Card useHeader={false}>
        <div slot="body">
            <TaskToolbar />
        </div>
    </Card>
    <Card useHeader={false}>
        <div slot="body">
            <TaskListView />
        </div>
    </Card>
</LayoutPage>
