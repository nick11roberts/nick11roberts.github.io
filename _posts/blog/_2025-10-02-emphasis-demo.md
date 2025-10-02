---
layout: post
title: 'Emphasis Style Options'
date: 2025-10-02
permalink: /posts/2025/10/emphasis-demo/
tags:
  - Demo
  - Styling
categories: [demo]
---

# Emphasis Style Options

Since your PPNeuebit font only has one weight, here are several alternative ways to create emphasis in your text:

## Standard Bold (now with color + shadow)
This is **bold text** using the standard `**bold**` markdown syntax. It now uses your primary color (#42b983) with a subtle text shadow and letter spacing.

## Alternative Emphasis Classes

### Color Emphasis
<span class="emphasis-color">This text uses color emphasis</span> - just changes the color to your primary theme color.

### Shadow Emphasis  
<span class="emphasis-shadow">This text uses shadow emphasis</span> - creates a bolder shadow effect.

### Letter Spacing Emphasis
<span class="emphasis-spacing">This text uses letter spacing emphasis</span> - increases the space between letters.

### Underline Emphasis
<span class="emphasis-underline">This text uses underline emphasis</span> - adds a colored underline.

**New:** You can also use `==double equals==` for underline: ==This is underlined text== - much easier to type!

### Background Emphasis
<span class="emphasis-background">This text uses background emphasis</span> - adds a subtle background color.

### Border Emphasis
<span class="emphasis-border">This text uses border emphasis</span> - adds a left border accent.

## How to Use These Classes

In your markdown, you can use HTML spans with these classes:

```html
<span class="emphasis-color">Important text</span>
<span class="emphasis-shadow">Bold-looking text</span>
<span class="emphasis-background">Highlighted text</span>
```

## Recommendation

I recommend using the **standard bold** (which now has color + shadow) for most cases, and the `emphasis-background` class for special highlights or callouts.
