"""Command line interface for hardware idea generator."""

import json
import typer
from pathlib import Path
from rich.console import Console
from rich.table import Table
from rich import print as rprint
from .idea_generator import HardwareIdeaGenerator
from .models import IdeaGenerationRequest

app = typer.Typer(help="Hardware Idea Generator CLI")
console = Console()


@app.command()
def generate(
    theme: str = typer.Option(None, "--theme", "-t", help="Theme or problem area"),
    category: str = typer.Option(None, "--category", "-c", help="Product category"),
    num: int = typer.Option(5, "--num", "-n", help="Number of ideas to generate"),
    min_price: float = typer.Option(10.0, "--min-price", help="Minimum target price"),
    max_price: float = typer.Option(200.0, "--max-price", help="Maximum target price"),
    output: Path = typer.Option(None, "--output", "-o", help="Output file (JSON)"),
):
    """Generate hardware product ideas."""
    console.print(f"[bold blue]Generating {num} hardware ideas...[/bold blue]")
    
    generator = HardwareIdeaGenerator()
    ideas = generator.generate_ideas(
        theme=theme,
        category=category,
        num_ideas=num,
        target_price_range=(min_price, max_price)
    )
    
    if not ideas:
        console.print("[red]No ideas generated. Check your API key and connection.[/red]")
        raise typer.Exit(1)
    
    # Display ideas in table
    table = Table(title="Generated Hardware Ideas")
    table.add_column("Name", style="cyan", no_wrap=False)
    table.add_column("Category", style="magenta")
    table.add_column("Feasibility", justify="center")
    table.add_column("Est. Cost", justify="right")
    
    for idea in ideas:
        table.add_row(
            idea.name,
            idea.category,
            f"{idea.feasibility_score:.1f}/10",
            f"${idea.estimated_cost:.2f}"
        )
    
    console.print(table)
    
    # Save to file if requested
    if output:
        ideas_dict = [idea.dict() for idea in ideas]
        with open(output, 'w') as f:
            json.dump(ideas_dict, f, indent=2)
        console.print(f"\n[green]Saved to {output}[/green]")
    
    # Print details of first idea
    if ideas:
        console.print(f"\n[bold]Example: {ideas[0].name}[/bold]")
        console.print(f"{ideas[0].description}\n")
        console.print(f"[yellow]Components:[/yellow] {', '.join(ideas[0].components)}")


@app.command()
def analyze(
    idea: str = typer.Argument(..., help="Hardware idea description"),
    detailed: bool = typer.Option(False, "--detailed", "-d", help="Show detailed analysis"),
):
    """Analyze feasibility of a hardware idea."""
    console.print(f"[bold blue]Analyzing idea...[/bold blue]")
    
    generator = HardwareIdeaGenerator()
    analysis = generator.analyze_feasibility(idea)
    
    console.print(f"\n[bold]Feasibility Analysis[/bold]")
    console.print(f"Overall Score: [cyan]{analysis.overall_score:.1f}/10[/cyan]\n")
    
    if detailed:
        console.print(f"Technical Complexity: {analysis.technical_complexity:.1f}/10")
        console.print(f"Manufacturing Cost: {analysis.manufacturing_cost:.1f}/10")
        console.print(f"Market Demand: {analysis.market_demand:.1f}/10")
        console.print(f"Differentiation: {analysis.differentiation:.1f}/10")
        console.print(f"Regulatory Hurdles: {analysis.regulatory_hurdles:.1f}/10\n")
    
    console.print(f"[yellow]Summary:[/yellow]\n{analysis.summary}\n")
    console.print(f"[green]Recommendations:[/green]")
    for i, rec in enumerate(analysis.recommendations, 1):
        console.print(f"  {i}. {rec}")


@app.command()
def components(
    idea: str = typer.Argument(..., help="Hardware idea description"),
    budget: float = typer.Option(50.0, "--budget", "-b", help="BOM budget in USD"),
):
    """Get component suggestions for an idea."""
    console.print(f"[bold blue]Generating component list...[/bold blue]")
    
    generator = HardwareIdeaGenerator()
    components = generator.suggest_components(idea, budget)
    
    table = Table(title=f"Component Suggestions (Budget: ${budget:.2f})")
    table.add_column("Component", style="cyan")
    table.add_column("Function", style="white")
    table.add_column("Cost", justify="right", style="green")
    
    total = 0.0
    for comp in components:
        cost = comp.get('estimated_cost', 0)
        total += cost
        table.add_row(
            comp.get('name', 'N/A'),
            comp.get('function', 'N/A'),
            f"${cost:.2f}"
        )
    
    console.print(table)
    console.print(f"\n[bold]Total Estimated Cost:[/bold] [green]${total:.2f}[/green]")
    
    if total > budget:
        console.print(f"[yellow]⚠ Over budget by ${total - budget:.2f}[/yellow]")


if __name__ == "__main__":
    app()
