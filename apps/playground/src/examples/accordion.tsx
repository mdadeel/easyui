import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@easyui/react";

export default function Example() {
  return (
    <Accordion>
      <AccordionItem value="one">
        <AccordionTrigger>What is EasyUI?</AccordionTrigger>
        <AccordionPanel>A collection of themeable React components.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Can I customize it?</AccordionTrigger>
        <AccordionPanel>Yes. Change the accent, radius, and font.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
