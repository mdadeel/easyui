import { Tabs, TabsList, TabsPanel, TabsTab } from "@easyui/react";

export default function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Workspace sections">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="activity">Activity</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Your workspace at a glance.</TabsPanel>
      <TabsPanel value="activity">You're all caught up.</TabsPanel>
    </Tabs>
  );
}
