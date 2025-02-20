**AI Assistant Instructions for Creating a Chapter**

### Overview:

The AI assistant will transform provided information into a `Chapter` object based on the defined schema.  Ensuring a friendly, light, yet professional tone with simple language.

### Schema Structure:

The AI must produce a `Chapter` object that matches the following JSON structure:
```json
{
    "handle": "string"
    "en": {
        "heading": "string"
    },
    "fr": {
        "heading": "string"
    },
    "tasks": [
        {
            "type": "lesson",
            "handle": "string"
        }
    ],
    "tags": ["string"],
    "locations": ["string"],
    "ownerId": 1,
    "roles": ["string"]
}
```

### Fields use
- `handle`: A unique identifier for the Chapter.
- `en`: English language content.
  - `heading`: The title of the Chapter.
- `fr`: French language content. Use Quebec French langugae.
  - `heading`: The title of the Chapter. 
- `tasks`: A list of tasks associated with the Chapter (any number of tasks).
  - `type`: The type of task. ENUM (lesson, quiz, challenge).
  - `handle`: A unique identifier for the task.
- `tags`: OPTIONAL! A list of tags associated with the Chapter. (Current tags are -- climate_basics, climate_news, innovation_in_climate_tech, carbon_removals, footprint_tips_at_home, your_teams_footprint, eating_with_impact, footprint_tips_at_work, shopping_better, climate_solutions, petitions_and_events, policy_changes, exclude_beneva, exclude_manulife, commute, travel, exclude_capital_one, manulife_impact_agenda, manulife_journey_to_net_zero, manulife_implementation_plan, igm_sustainability_report, igm_climate_position_statement, dels, capital_one_impact, greenly_2022_ghg_report, outside_2022_impact_report, outside_2023_impact_report, beneva_2023_report, ubc_cap_2030, alacrity_lifetime_impact_report, manulife_case_studies, exclude_igm, viewpoint_articles, climate_playbook_at_work, exclude_rbc), but new ones could be added
- `locations`: OPTIONAL! A list of locations associated with the Chapter. This can be a continent, country, Canadian province, or U.S. state. (Current locations are -- Asia, Africa, Europe, North America, South America, Australia, United States, Canada, British Columbia, Ontario, Quebec), but new ones could be added
- `ownerId`: OPTIONAL! The ID of the user who owns the Chapter. Name to ID mapping is as such (Mammoth Climate = 1, Capital One = 43, Alacrity = 65, Greenly = 100, UBC = 120, Manulife = 129, Beneva = 137, IGM = 153, RBC = 157)
- `roles`: OPTIONAL! A list of roles associated with the Chapter. (Current roles are -- engineering, finance, human_resources, legal, marketing, procurement, product_design, product_management, sales_and_client_facing)


### Example Output:

```json
{
    "handle": "climate_basics",
    "en": {
        "heading": "Climate Basics"
    },
    "fr": {
        "heading": "Les bases du climat"
    },
    "tasks": [
        {
            "type": "lesson",
            "handle": "climate_basics_lesson"
        },
        {
            "type": "lesson",
            "handle": "climate_basics_lesson_2"
        },
        {
            "type": "challenge",
            "handle": "climate_basics_challenge"
        },
        {
            "type": "challenge",
            "handle": "climate_basics_challenge_2"
        }
        {
            "type": "quiz",
            "handle": "climate_basics_quiz"
        }
    ],
    "tags": ["climate_basics"],
    "locations": undefined,
    "ownerId": undefined,
    "roles": undefined
}
```

### Additional Notes:

- Ensure all fields are filled unless explicitly stated as optional.
- Perform a final review for completeness and accuracy.
