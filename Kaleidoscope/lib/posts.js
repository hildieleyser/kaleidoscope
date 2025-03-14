import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { calculateReadingTime } from '../utils/date'

const postsDirectory = path.join(process.cwd(), '_posts')

export function getAllPosts() {
  // Create _posts directory if it doesn't exist (for development)
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    
    // Create a sample post if no posts exist
    if (fs.readdirSync(postsDirectory).length === 0) {
      createSamplePosts()
    }
  }
  
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '')
      
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)
      
      // Calculate reading time
      const readingTime = calculateReadingTime(matterResult.content)
      
      // Combine the data with the id
      return {
        slug,
        readingTime,
        ...matterResult.data,
      }
    })
    
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured)
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    
    // Calculate reading time
    const readingTime = calculateReadingTime(matterResult.content)
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content)
    const contentHtml = processedContent.toString()
    
    // Combine the data with the id and contentHtml
    return {
      slug,
      readingTime,
      content: contentHtml,
      ...matterResult.data,
    }
  } catch (error) {
    console.error(`Error processing post ${slug}:`, error)
    return null
  }
}

// Create sample posts for development
function createSamplePosts() {
  const samplePosts = [
    {
      title: 'The Neuroscience of Creativity',
      date: '2023-12-15',
      excerpt: 'Explore how neural networks in our brain collaborate to generate new ideas and creative solutions.',
      author: {
        name: 'Dr. Emma Chen',
        bio: 'Neuroscientist with a focus on cognitive creativity research. Always curious about how we generate and synthesize new ideas.',
        avatar: '/images/authors/emma-chen.jpg',
        twitter: 'emmachen',
        linkedin: 'emmachen',
        website: 'https://emma-chen.com'
      },
      categories: ['neuroscience', 'cognition', 'creativity'],
      coverImage: '/images/posts/creativity.jpg',
      featured: true,
      content: `
# The Neuroscience of Creativity

Creativity has long been considered a mysterious and almost magical ability. But modern neuroscience is beginning to unravel how our brains actually generate new ideas and innovative solutions.

## The Default Mode Network

When you're daydreaming or letting your mind wander, a collection of brain regions called the **Default Mode Network (DMN)** becomes active. This network includes:

- The medial prefrontal cortex
- Posterior cingulate cortex
- Angular gyrus
- Hippocampus

Research shows that people with stronger connections in their DMN often score higher on tests of creative thinking. This suggests that the ability to generate new ideas is partly linked to how well different parts of our brain communicate when we're not focused on an immediate task.

## The Executive Control Network

While the DMN generates ideas, the **Executive Control Network** helps evaluate them. This network becomes active when we need to:

- Focus our attention
- Make decisions
- Evaluate the feasibility of ideas
- Fine-tune creative concepts

The most creative people appear to be those who can easily switch between these networks, generating ideas freely and then critically evaluating them.

## Neurochemistry of Creativity

Several neurotransmitters play important roles in creativity:

1. **Dopamine** - Associated with motivation, curiosity, and the pleasure of finding new solutions
2. **GABA** - Reduces neural activity in certain areas, which can help quiet internal censors
3. **Norepinephrine** - Helps maintain alertness and engagement during creative activities

## Enhancing Creative Thinking

Based on neuroscience research, several approaches can help enhance creativity:

- **Mindfulness meditation** - Strengthens both the DMN and cognitive control networks
- **Physical exercise** - Increases blood flow to the brain and promotes neuroplasticity
- **Exposure to diverse experiences** - Creates more neural connections that can be combined in novel ways
- **Positive mood** - Associated with broader attention and more flexible thinking

Remember that creativity isn't a fixed trait but a skill that can be developed through practice and the right environmental conditions.
      `
    },
    {
      title: 'Memory Reconsolidation: How Memories Change Over Time',
      date: '2023-11-28',
      excerpt: 'Discover the fascinating process of memory reconsolidation and why our memories aren\'t as reliable as we think.',
      author: {
        name: 'Dr. Marcus Johnson',
        bio: 'Researcher specializing in memory formation and recall. Fascinated by how we construct and reconstruct our personal narratives.',
        avatar: '/images/authors/marcus-johnson.jpg',
        twitter: 'drmarcusjohnson',
        linkedin: 'marcus-johnson-neuro',
        website: 'https://memoryscience.org'
      },
      categories: ['memory', 'neuroscience', 'psychology'],
      coverImage: '/images/posts/memory.jpg',
      featured: true,
      content: `
# Memory Reconsolidation: How Memories Change Over Time

Have you ever been completely certain about a memory, only to find out later that key details were wrong? This isn't a failure of your brain — it's actually a feature of how memory works.

## The Myth of Memory as a Recording

For a long time, people thought of memory like a video recording: once saved, it would play back exactly the same way each time. Neuroscience has thoroughly debunked this idea. Instead, memories are:

- **Reconstructed** each time we recall them
- **Vulnerable to change** during recall
- **Influenced** by our current knowledge, beliefs, and emotional state

## What is Memory Reconsolidation?

Memory reconsolidation is the process by which existing memories are destabilized when recalled, making them temporarily malleable before being stored again. This process involves:

1. **Activation** - The memory is brought into conscious awareness
2. **Destabilization** - The memory becomes temporarily unstable and modifiable
3. **Reconsolidation** - The memory is re-stored, potentially with modifications

During this process, memories can be strengthened, weakened, or altered—sometimes substantially.

## The Neurobiology Behind Reconsolidation

At the cellular level, reconsolidation involves:

- **Protein synthesis** - New proteins must be created to re-stabilize the memory
- **NMDA receptors** - These glutamate receptors play a key role in synaptic plasticity
- **Amygdala activity** - Particularly important for emotional memory reconsolidation

If protein synthesis is blocked during the reconsolidation window (generally within a few hours of recall), the memory can fail to restabilize.

## Implications and Applications

Understanding memory reconsolidation has profound implications:

- **Therapeutic potential** - Reconsolidation-based therapies show promise for treating PTSD and phobias
- **Legal testimony** - Eyewitness accounts may change based on how memories are retrieved and restabilized
- **Learning enhancement** - Strategic recall timing may strengthen educational outcomes

## Protecting Your Memories

While we can't prevent reconsolidation, we can make our important memories more resistant to distortion:

- **Mindful recall** - Being aware that recalling memories can change them
- **Multiple retrieval contexts** - Recalling memories in different environments can strengthen core elements
- **Sleep** - Adequate sleep improves memory consolidation and may protect against false memories

Remember, the changeable nature of memory isn't a bug—it's what allows us to update our understanding of the world and integrate new information with our existing knowledge.
      `
    },
    {
      title: 'The Gut-Brain Connection: How Your Microbiome Affects Your Mind',
      date: '2023-10-17',
      excerpt: 'The fascinating bidirectional communication between your gut microbiome and your brain, and how it affects mood, cognition, and mental health.',
      author: {
        name: 'Dr. Sofia Rodriguez',
        bio: 'Microbiome researcher with a background in neuroscience. Passionate about understanding how our bacterial companions influence our mental states.',
        avatar: '/images/authors/sofia-rodriguez.jpg',
        twitter: 'gutbraindr',
        linkedin: 'sofia-rodriguez-phd',
        website: 'https://microbiomemind.com'
      },
      categories: ['neuroscience', 'microbiome', 'brain-health'],
      coverImage: '/images/posts/gut-brain.jpg',
      featured: true,
      content: `
# The Gut-Brain Connection: How Your Microbiome Affects Your Mind

Your gut contains trillions of bacteria, fungi, and viruses collectively known as the gut microbiome. Far from being passive passengers, these microorganisms actively communicate with your brain and can significantly impact your mental health, cognitive function, and even personality.

## The Bidirectional Highway

The gut and brain communicate through multiple pathways:

- **The vagus nerve** - A direct neural connection that transmits signals in both directions
- **Immune system signaling** - Gut microbes influence systemic inflammation, which affects brain function
- **Neurotransmitter production** - Gut bacteria produce many of the same chemicals used by our neurons
- **Metabolites** - Bacterial byproducts that can cross the blood-brain barrier and influence neural activity

This communication network is often called the "gut-brain axis."

## Microbes as Mood Regulators

Research increasingly shows that gut microbes influence our emotional states:

- **Serotonin production** - About 90% of the body's serotonin (the "happiness neurotransmitter") is produced in the gut
- **Stress response** - Certain bacterial strains can reduce cortisol levels and anxiety behaviors
- **Depression link** - Patients with depression often show distinct gut microbiome patterns

In animal studies, transferring gut bacteria from anxious mice to calm mice can transfer the anxiety behaviors, suggesting a causal relationship.

## Cognitive Effects of Your Microbiome

The microbiome's influence extends to thinking and memory:

- **BDNF levels** - Some bacteria influence levels of Brain-Derived Neurotrophic Factor, which supports learning and memory
- **Neuroinflammation** - Microbiome diversity is associated with reduced brain inflammation, which benefits cognitive function
- **Attention and processing speed** - Associated with specific microbial signatures

## Cultivating a Brain-Healthy Microbiome

Based on current research, these approaches may support a brain-healthy gut:

1. **Dietary diversity** - Eating a wide range of plant foods supports microbiome diversity
2. **Fermented foods** - Yogurt, kefir, sauerkraut, and kimchi may introduce beneficial microbes
3. **Prebiotic fibers** - Found in foods like garlic, onions, asparagus, and bananas
4. **Limited antibiotics** - Using antibiotics only when necessary helps preserve microbiome diversity
5. **Stress management** - Chronic stress negatively impacts both gut and brain health

## The Future of Psychobiotics

"Psychobiotics" refers to bacteria with potential mental health benefits. While research is still emerging, future treatments might include:

- Targeted probiotic formulations for specific mental health conditions
- Personalized microbiome analysis to guide dietary recommendations
- Fecal microbiota transplantation for severe neuropsychiatric conditions

This growing field demonstrates how interconnected our bodily systems truly are, challenging the traditional separation between mental and physical health.

Remember, our understanding of the gut-brain connection is still evolving. While the research is promising, consult healthcare professionals before making major changes to address mental health concerns.
      `
    }
  ]
  
  samplePosts.forEach(post => {
    const filePath = path.join(postsDirectory, `${post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}.md`)
    
    const fileContent = `---
title: "${post.title}"
date: "${post.date}"
excerpt: "${post.excerpt}"
author:
  name: "${post.author.name}"
  bio: "${post.author.bio}"
  avatar: "${post.author.avatar}"
  twitter: "${post.author.twitter}"
  linkedin: "${post.author.linkedin}"
  website: "${post.author.website}"
categories: [${post.categories.map(c => `"${c}"`).join(', ')}]
coverImage: "${post.coverImage}"
featured: ${post.featured}
---

${post.content}
`
    
    fs.writeFileSync(filePath, fileContent)
  })
} 