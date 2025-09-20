import { useState } from "react";
import { analyseDescription } from "../utils/apiUtils";
import DescriptionInput from "../components/DescriptionInput";
import ProjectResults from "../components/ProjectResults";

function HomePage() {
  const [description, setDescription] = useState("");
  const [projectData, setProjectData] = useState({
    id: "68cdeb4edcca08b7c297a110",
    userDescription:
      "I want an event planning app where organizers can create events, attendees can register and buy tickets, and venue managers can manage event locations and capacity.",
    extractedRequirements: {
      appName: "Event Planning",
      entities: ["Event", "Attendee", "Venue", "Ticket"],
      roles: ["Organizer", "Attendee", "Venue Manager"],
      features: [
        "Create Event",
        "Register Attendee",
        "Buy Tickets",
        "Manage Locations",
        "Manage Capacity",
      ],
      id: "68cdeb4edcca08b7c297a111",
    },
    uiMetadata: {
      formConfig: {
        Event: {
          fields: [
            { name: "Title", type: "text", id: "68cdeb4edcca08b7c297a114" },
            { name: "Date", type: "date", id: "68cdeb4edcca08b7c297a115" },
            {
              name: "Description",
              type: "textarea",
              id: "68cdeb4edcca08b7c297a116",
            },
            { name: "Location", type: "text", id: "68cdeb4edcca08b7c297a117" },
            {
              name: "Capacity",
              type: "number",
              id: "68cdeb4edcca08b7c297a118",
            },
          ],
          id: "68cdeb4edcca08b7c297a113",
        },
        Attendee: {
          fields: [
            { name: "Name", type: "text", id: "68cdeb4edcca08b7c297a11a" },
            { name: "Email", type: "email", id: "68cdeb4edcca08b7c297a11b" },
            {
              name: "Ticket Type",
              type: "select",
              id: "68cdeb4edcca08b7c297a11c",
            },
            {
              name: "Registration Date",
              type: "date",
              id: "68cdeb4edcca08b7c297a11d",
            },
          ],
          id: "68cdeb4edcca08b7c297a119",
        },
        Venue: {
          fields: [
            { name: "Name", type: "text", id: "68cdeb4edcca08b7c297a11f" },
            { name: "Location", type: "text", id: "68cdeb4edcca08b7c297a120" },
            {
              name: "Capacity",
              type: "number",
              id: "68cdeb4edcca08b7c297a121",
            },
          ],
          id: "68cdeb4edcca08b7c297a11e",
        },
        Ticket: {
          fields: [
            { name: "Event", type: "text", id: "68cdeb4edcca08b7c297a123" },
            { name: "Attendee", type: "text", id: "68cdeb4edcca08b7c297a124" },
            { name: "Type", type: "select", id: "68cdeb4edcca08b7c297a125" },
            { name: "Price", type: "number", id: "68cdeb4edcca08b7c297a126" },
          ],
          id: "68cdeb4edcca08b7c297a122",
        },
      },
      roleFeatureMapping: {
        Organizer: {
          features: ["Create Event", "Register Attendee", "Buy Tickets"],
          id: "68cdeb4edcca08b7c297a127",
        },
        Attendee: {
          features: ["Register Attendee", "Buy Tickets"],
          id: "68cdeb4edcca08b7c297a128",
        },
        "Venue Manager": {
          features: ["Manage Locations", "Manage Capacity"],
          id: "68cdeb4edcca08b7c297a129",
        },
      },
      id: "68cdeb4edcca08b7c297a112",
    },
    createdAt: "2025-09-19T23:46:22.497Z",
    version: 0,
  });
  console.log(projectData);

  const handleSubmit = async () => {
    try {
      const response = await analyseDescription(description);
      setProjectData(response);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div
        className={`${
          projectData
            ? "space-y-8 max-w-5xl w-full"
            : "text-center space-y-8 max-w-2xl w-full"
        }`}
      >
        <h1
          className={`text-6xl font-bold text-white mb-4 ${
            projectData ? "text-left" : "text-center"
          }`}
        >
          ai app builder
        </h1>

        <p
          className={`text-xl text-gray-400 mb-12 ${
            projectData ? "text-left" : "text-center"
          }`}
        >
          build with a single prompt. no coding needed.
        </p>
        {!projectData ? (
          <DescriptionInput
            description={description}
            setDescription={setDescription}
            onSubmit={handleSubmit}
          />
        ) : (
          <ProjectResults projectData={projectData} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
