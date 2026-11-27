# The old blog stays on wordpress.com, and its links redirect there

fabiofortkamp.com used to host a WordPress.com blog with about 340 posts from
2013 to 2024, mostly in Portuguese. When the domain moves to this site, that
blog keeps running at its free address, fabiofortkamp.wordpress.com, and
`netlify.toml` redirects its old URLs there. We chose this over importing the
posts or letting the links break: no old link dies, the new site starts clean
in English, and keeping the old blog costs nothing.

## Considered Options

- Import the posts as Portuguese **Posts**: a large migration of mixed
  quality, against the English-only decision.
- Back up the blog and let the old links die: breaks every existing link and
  search result.
- A static archive on a subdomain: worth doing later as a **Project**, not
  needed for launch.

## Consequences

WordPress.com must treat fabiofortkamp.wordpress.com as the blog's primary
address before DNS moves. Otherwise it sends redirected visitors back to
fabiofortkamp.com, and they loop between the two hosts.
