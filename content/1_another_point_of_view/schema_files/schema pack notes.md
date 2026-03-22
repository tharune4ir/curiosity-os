# Curiosity OS Schema Pack v1

This pack locks the topic-first atomic graph model for Curiosity OS.

## Included files
- curiosity_os_master_universe_schema_v1.json
- curiosity_os_teaching_state_schema_v1.json
- curiosity_os_universe_layouts_schema_v1.json

## Design rules
1. One node = one teachable idea.
2. Wing, arena, and module live in metadata; they are not the main visible graph objects.
3. Canonical short wing names:
   - Decode
   - Cognition
   - Relate
   - Sandbox
4. Wing 3 supports public topics plus embedded internal topics.
5. Wing 4 is a sandbox/practice universe with zone nodes, practice atoms, and optional outcome nodes.
6. The top-level edges array is the authoritative source of relationships.
7. Dynamic progress, remarks, and teaching history belong in teaching_state.json, not in the canonical universe file.
