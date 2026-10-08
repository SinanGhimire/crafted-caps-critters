<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep side-scroller gravity and one-way platform collision in the browser-safe platform module so actors share one landing rule.
- Keep finite wave queues, controlled difficulty and rewards in a pure wave configuration module so progression rules can be tested independently.
- Preserve the existing canvas combat engine and menus; uploaded content enters through CDN asset manifests rather than a second game framework.
- Reuse the existing local profile save for offline run progression; no new account service is required by this conversion.
- Load uploaded enemy and environment textures on demand from their catalogue so the full content library does not delay startup.
