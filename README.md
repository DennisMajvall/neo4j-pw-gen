- `pnpm start` ([http://localhost:3000](http://localhost:3000))
- `pnpm test`

## Changes since last

I had no idea what areas you'd like me to focus on in this so I did a little bit of everything, the primary areas I saw improvement could be made in. I hope it's enough now and if you have any questions I look forward to discussing them.

I switched over to:

- Vite
- Vitest
- ESLint 9 (e.g flat-config)

Getting all of the configurations for this correct took ~3 hrs. The reason for this was that I read a lot of documentation & it was difficult to find solutions as ESLint 9 is VERY NEW, they changed their format entirely and most internet sources refer to the old way of doing it.

Re-wrote the entire Slider from scratch (several hours), the new version doesn't use the native input type="range" as it was incredibly difficult to fine tweak, for example you can't add a ::before to the slider-thumb making the hover effect hard.

Since the Figma design only showed a static picture in the normal state I tried to make my slider look like the one you have in Storybook in regards to the other states.

It was difficult to get the slider's user-select right. With the help of internet I finally found the solution which was the ("invisible") inner span found in `slider-thumb.tsx`. Before fixing it - dragging the slider would perform text-selections on the checkbox labels and other elements.

Fixed a small bug with the password-generation where the random replcement of including characters had the risk of overwriting each other, no longer guaranteeing that all of the includes were added.

Wrote a couple of tests, there can always be more of course but the ones I wrote test a few different things in the UI & code. No e2e or GH Action/Pipeline coding done "yet".

# older info below

## Personal message

I used create-react-app (quick n easy right?) but in hindsight really wish I didn't.. You might see why in the commits, otherwise we can always have a chat about it.

Not everything is perfect in this assignment but I'm working on a fairly big time restraint with juggling with personal life at the same time.

I found the instruction "Different states for Slider component" somewhat confusing, I assumed it was hover/active/focus/disabled? I don't know if I did enough on this, but for a quick home assignment I guess so.

### What took the longest time?

- Build errors and related things (3+ hrs)
- Trying to customize the native `<input type="range">` to match the Figma design. (2+ hrs)
  - In the end I realized you couldn't modify it as much as I wanted to.
  - Would re-do it in a different (less HTML native) way next time.
- Browsing Needle (1 hr)
- Making the "Dialog" (<1 hr)
- Generate random password (<1 hr)
- Copy to clipboard (<1 hr)
- Random misc improvements/fixes found long after (2 hrs)
- Didn't get jest to run with imports from needle.
  - Read that "vitest" would work waaay simpler out-of-the-box but I have to turn this in as it is for now.

I left some comments here and there in the code (which I could've left here instead but whatever :D too late now).

### Have a nice day and talk to you soon!
